import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IncidentStatus } from "src/common/enums/incident.enum";
import { MyLoggerService } from "src/common/services/my-logger.service";
import { Repository, UpdateResult } from "typeorm";
import { Monitor } from "../monitor/monitor.entity";
import { Incident } from "./incident.entity";

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly logger: MyLoggerService,
  ) {}

  async createIncident(monitor: Partial<Monitor>, error?: string) {
    const title = `Monitor ${monitor.name} is down`;
    const description = error
      ? `Failed to connect to ${monitor.url}: ${error}`
      : `Monitor ${monitor.name} (${monitor.url}) is not responding`;

    const incident: Incident = new Incident({
      monitor_id: monitor.id,
      title,
      description,
    });

    await this.incidentRepository.insert(incident);
  }

  async resolveIncident(monitor_id: number) {
    const updateResult: UpdateResult = await this.incidentRepository
      .createQueryBuilder("internal_ticket")
      .update(Incident)
      .set({
        status: "resolved",
        resolved_at: new Date(),
      })
      .where("monitor_id = :monitor_id", { monitor_id })
      .andWhere("status = :status", { status: IncidentStatus.OPEN })
      .returning(["started_at", "resolved_at"])
      .execute();

    if (updateResult.affected === 0) {
      this.logger.warn(`No open incidents found for monitor ${monitor_id}`);
      return null;
    }

    return updateResult.raw[0];
  }

  async getUserIncidents(user_id: string) {
    return await this.incidentRepository
      .createQueryBuilder("incident")
      .leftJoin("incident.monitor", "monitor")
      .select([
        "incident.id",
        "incident.title",
        "incident.description",
        "incident.status",
        "incident.created_at",
        "incident.resolved_at",

        "monitor.id",
        "monitor.name",
        "monitor.url",
      ])
      .where("monitor.user_id = :user_id", { user_id })
      .orderBy("incident.created_at", "DESC")
      .getMany();
  }
}
