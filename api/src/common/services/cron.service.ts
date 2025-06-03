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

  @Cron(CronExpression.EVERY_MINUTE)
  async checkMonitorStatus() {
    this.logger.log("Starting monitor status check...");

    const monitors: Monitor[] = await this.monitorRepository.find({
      relations: ["user"],
    });

    for (const monitor of monitors) {
      try {
        const start = process.hrtime.bigint();
        const response = await this.httpService.axiosRef.get(monitor.url, {
          timeout: 10000, // 10 seconds timeout
        });
        const end = process.hrtime.bigint();
        const responseTime = Math.round(Number(end - start) / 1_000_000);

        const isUp = response.status >= 200 && response.status < 300;
        const newStatus = isUp ? MonitorStatus.UP : MonitorStatus.DOWN;

        if (monitor.status !== newStatus) {
          await this.monitorRepository.update(monitor.id, {
            status: newStatus,
            last_checked_at: dayjs(),
            response_time: responseTime,
          });

          if (!isUp) {
            // Create an incident if the monitor is down
            await this.incidentService.createIncident(monitor);
            if (monitor.user.email_opt_in) {
              await this.emailService.sendDownNotification(
                monitor.user.email,
                monitor.name,
                monitor.url,
              );
            }
            this.logger.warn(`Monitor ${monitor.name} is down: ${monitor.url}`);
          } else if (monitor.status === MonitorStatus.DOWN) {
            // Resolve any open incidents when monitor comes back up
            const incident: Partial<Incident> =
              await this.incidentService.resolveIncident(monitor.id);
            if (monitor.user.email_opt_in && incident) {
              const downtime = this.calculateDowntime(
                incident.started_at,
                incident.resolved_at,
              );
              await this.emailService.sendUpNotification(
                monitor.user.email,
                monitor.name,
                monitor.url,
                downtime,
              );
            }
            this.logger.log(`Monitor ${monitor.name} is back up`);
          }
        } else {
          await this.monitorRepository.update(monitor.id, {
            last_checked_at: dayjs(),
            response_time: responseTime,
          });
        }
      } catch (error) {
        // If request fails, mark monitor as down
        if (monitor.status !== MonitorStatus.DOWN) {
          await this.monitorRepository.update(monitor.id, {
            status: MonitorStatus.DOWN,
            last_checked_at: dayjs(),
          });

          // Create an incident for the failure
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
    }

    this.logger.log("Monitor status check completed");
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkSslExpiry() {
    this.logger.log("Starting daily SSL certificate check...");

    try {
      const monitors = await this.monitorRepository.find({
        relations: ["user"],
      });

      for (const monitor of monitors) {
        try {
          const sslCheck = await this.sslCheckerService.checkDomain(
            monitor.url,
          );

          if (sslCheck.success) {
            const daysToExpiry = sslCheck.data.daysRemaining;

            // Check if SSL is expiring in the next day
            if (daysToExpiry <= 1 && monitor.user.email_opt_in) {
              await this.emailService.sendSSLExpiryNotification(
                monitor.user.email,
                monitor.name,
                monitor.url,
                daysToExpiry,
              );
              this.logger.warn(
                `SSL certificate for ${monitor.name} (${monitor.url}) is expiring in ${daysToExpiry} days`,
              );
            }
          }
        } catch (error) {
          this.logger.error(
            `Failed to check SSL for ${monitor.name}: ${error.message}`,
          );
        }
      }
    } catch (error) {
      this.logger.error(`SSL check cron job failed: ${error.message}`);
    }
  }
}
