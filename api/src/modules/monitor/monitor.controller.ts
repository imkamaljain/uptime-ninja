import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { AddMonitorRequestDto } from "./dto/request/add-monitor-request.dto";
import { UpdateMonitorRequestDto } from "./dto/request/update-monitor-request.dto";
import { MonitorService } from "./monitor.service";

@ApiBearerAuth("JWT")
@Controller("monitor")
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @Get()
  @ApiOperation({
    summary: "Get all monitor",
    description: "Get all monitors of user",
  })
  @HttpCode(HttpStatus.OK)
  async getAllMonitor(@User("id") user_id: string) {
    return this.monitorService.getAllMonitor(user_id);
  }

  @Post()
  @ApiOperation({
    summary: "Add monitor",
    description: "Add monitor for user",
  })
  @HttpCode(HttpStatus.CREATED)
  async addMonitor(
    @User("id") user_id: string,
    @Body() body: AddMonitorRequestDto,
  ) {
    return this.monitorService.addMonitor(user_id, body);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update monitor",
    description: "Update monitor of user",
  })
  @HttpCode(HttpStatus.OK)
  async updateMonitor(
    @User("id") user_id: string,
    @Param("id") monitor_id: number,
    @Body() body: UpdateMonitorRequestDto,
  ) {
    return this.monitorService.updateMonitor(user_id, monitor_id, body);
  }

  @Delete("all")
  @ApiOperation({
    summary: "Delete all monitor",
    description: "Delete all monitors of user",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllMonitor(@User("id") user_id: string) {
    return this.monitorService.deleteAllMonitor(user_id);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete monitor",
    description: "Delete monitor of user",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMonitor(
    @User("id") user_id: string,
    @Param("id") monitor_id: number,
  ) {
    return this.monitorService.deleteMonitor(user_id, monitor_id);
  }
}
