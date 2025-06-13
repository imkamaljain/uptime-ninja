import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import dayjs from "dayjs";
import { Incident } from "src/modules/incident/incident.entity";
import { IncidentService } from "src/modules/incident/incident.service";
import { Monitor } from "src/modules/monitor/monitor.entity";
import { Repository } from "typeorm";
import { MonitorStatus } from "../enums/monitor.enum";
import { EmailService } from "./email.service";
import { MyLoggerService } from "./my-logger.service";
import { SlackService } from "./slack.service";
import { SslCheckerService } from "./ssl-checker.service";

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Monitor)
    private readonly monitorRepository: Repository<Monitor>,
    private readonly logger: MyLoggerService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
    private readonly incidentService: IncidentService,
    private readonly sslCheckerService: SslCheckerService,
    private readonly slackService: SlackService,
  ) {}

  private calculateDowntime(startDate: Date, endDate: Date): string {
    const duration = Math.floor(
      (endDate.getTime() - startDate.getTime()) / 1000,
    );
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return hours > 0
      ? `${hours} hours ${minutes} minutes`
      : `${minutes} minutes`;
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  @Cron(CronExpression.EVERY_MINUTE)
  async checkMonitorStatus() {
    this.logger.log("Starting monitor status check...");

    const monitors: Partial<Monitor>[] = await this.monitorRepository
      .createQueryBuilder("monitor")
      .leftJoin("monitor.user", "user")
      .select([
        "monitor.id",
        "monitor.name",
        "monitor.url",
        "monitor.status",

        "user.id",
        "user.email",
        "user.email_opt_in",
        "user.slack_webhook_url",
        "user.is_deleted",
      ])
      .where("user.is_deleted = :isDeleted", { isDeleted: false })
      .getMany();

    const updates: Partial<Monitor>[] = [];
    const tasks = monitors.map(async (monitor) => {
      try {
        const start: bigint = process.hrtime.bigint();
        const response = await this.httpService.axiosRef.get(monitor.url, {
          timeout: 5000,
        });
        const end: bigint = process.hrtime.bigint();
        const responseTime: number = Math.round(
          Number(end - start) / 1_000_000,
        );

        const isUp: boolean = response.status >= 200 && response.status < 300;
        const newStatus: MonitorStatus.UP | MonitorStatus.DOWN = isUp
          ? MonitorStatus.UP
          : MonitorStatus.DOWN;

        if (monitor.status !== newStatus) {
          updates.push({
            id: monitor.id,
            status: newStatus,
            last_checked_at: dayjs().toDate(),
            response_time: responseTime,
          });

          if (!isUp) {
            await this.incidentService.createIncident(monitor);
            if (monitor.user.email_opt_in) {
              await this.emailService.sendDownNotification(
                monitor.user.email,
                monitor.name,
                monitor.url,
              );
            }
            if (monitor.user.slack_webhook_url) {
              const message = `🔴 *${monitor.name}* is down\n${monitor.url}`;
              await this.slackService.sendAlert(
                monitor.user.slack_webhook_url,
                message,
              );
            }
            this.logger.warn(`Monitor ${monitor.name} is down: ${monitor.url}`);
          } else if (monitor.status === MonitorStatus.DOWN) {
            const incident: Partial<Incident> =
              await this.incidentService.resolveIncident(monitor.id);
            if (incident) {
              if (monitor.user.email_opt_in) {
                const downtime = this.calculateDowntime(
                  incident.created_at,
                  incident.resolved_at,
                );
                await this.emailService.sendUpNotification(
                  monitor.user.email,
                  monitor.name,
                  monitor.url,
                  downtime,
                );
              }
              if (monitor.user.slack_webhook_url) {
                const message = `🟢 *${monitor.name}* is back up\n${monitor.url}`;
                await this.slackService.sendAlert(
                  monitor.user.slack_webhook_url,
                  message,
                );
              }
              this.logger.log(`Monitor ${monitor.name} is back up`);
            }
          }
        } else {
          updates.push({
            id: monitor.id,
            last_checked_at: dayjs().toDate(),
            response_time: responseTime,
          });
        }
      } catch (error) {
        if (monitor.status !== MonitorStatus.DOWN) {
          updates.push({
            id: monitor.id,
            status: MonitorStatus.DOWN,
            last_checked_at: dayjs().toDate(),
          });
          await this.incidentService.createIncident(monitor, error.message);
          if (monitor.user.email_opt_in) {
            await this.emailService.sendDownNotification(
              monitor.user.email,
              monitor.name,
              monitor.url,
              error.message,
            );
          }
          this.logger.error(
            `Monitor ${monitor.name} check failed: ${error.message}`,
          );
        }
      }
    });

    await Promise.all(tasks);
    if (updates.length > 0) {
      await this.monitorRepository.save(updates, { chunk: 100 });
    }

    this.logger.log("Monitor status check completed");
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkSslExpiry() {
    this.logger.log("Starting daily SSL certificate check...");

    const monitors = await this.monitorRepository.find({
      select: ["id", "name", "url"],
      relations: { user: true },
      loadRelationIds: { relations: ["user.email"] },
    });

    const tasks = monitors.map(async (monitor) => {
      try {
        const sslCheck = await this.sslCheckerService.checkDomain(monitor.url);
        if (
          sslCheck.success &&
          sslCheck.data.daysRemaining <= 1 &&
          monitor.user.email_opt_in
        ) {
          await this.emailService.sendSSLExpiryNotification(
            monitor.user.email,
            monitor.name,
            monitor.url,
            sslCheck.data.daysRemaining,
          );
          this.logger.warn(
            `SSL certificate for ${monitor.name} (${monitor.url}) is expiring in ${sslCheck.data.daysRemaining} days`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Failed to check SSL for ${monitor.name}: ${error.message}`,
        );
      }
    });

    await Promise.all(tasks);
    this.logger.log("SSL certificate check completed");
  }
}
