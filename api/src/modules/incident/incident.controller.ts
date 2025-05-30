import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

import { User } from "src/common/decorators/user.decorator";
import { IncidentService } from "./incident.service";

@Controller("incident")
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserIncidents(@User("id") user_id: number) {
    return this.incidentService.getUserIncidents(user_id);
  }
}
