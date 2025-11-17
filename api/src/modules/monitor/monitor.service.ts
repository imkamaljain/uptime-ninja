import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SslCheckerService } from "src/common/services/ssl-checker.service";
import { Repository, UpdateResult } from "typeorm";
import { AddMonitorRequestDto } from "./dto/request/add-monitor-request.dto";
import { UpdateMonitorRequestDto } from "./dto/request/update-monitor-request.dto";
import { Monitor } from "./monitor.entity";

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Monitor)
    private monitorRepository: Repository<Monitor>,
    private readonly sslCheckerService: SslCheckerService,
  ) {}

  async getAllMonitor(user_id: string) {
    const data = await this.monitorRepository.find({
      where: { user_id },
      order: { created_at: "ASC" },
    });
    return data;
  }

  async addMonitor(user_id: string, body: AddMonitorRequestDto) {
    const { name, url } = body;
    const monitorExists: boolean = await this.monitorRepository.exists({
      where: {
        user_id,
        url,
      },
    });

    if (monitorExists) {
      throw new ConflictException("monitorExists");
    }

    const sslCheck = await this.sslCheckerService.checkDomain(url);
    const sslData = sslCheck.success ? sslCheck.data : {};

    await this.monitorRepository.insert(
      new Monitor({
        user_id,
        name,
        url,
        ssl_valid_from: sslData.validFrom || null,
        ssl_valid_to: sslData.validTo || null,
      }),
    );
    return {
      message: "success",
    };
  }

  async updateMonitor(
    user_id: string,
    monitor_id: number,
    body: UpdateMonitorRequestDto,
  ) {
    try {
      const updateResult: UpdateResult = await this.monitorRepository.update(
        {
          id: monitor_id,
          user_id,
        },
        {
          name: body.name,
          url: body.url,
          check_interval_minutes: body.check_interval_minutes,
        },
      );

      if (updateResult.affected === 0) {
        throw new NotFoundException("monitor not found");
      }

      return {
        message: "success",
      };
    } catch (error) {
      if (error.code === "23505" || error.message.includes("unique")) {
        throw new BadRequestException(
          "A monitor with this URL already exists.",
        );
      }
      throw error;
    }
  }

  async deleteMonitor(user_id: string, monitor_id: number) {
    await this.monitorRepository.delete({
      id: monitor_id,
      user_id,
    });
    return {
      message: "success",
    };
  }

  async deleteAllMonitor(user_id: string) {
    await this.monitorRepository.delete({
      user_id,
    });
    return {
      message: "success",
    };
  }
}
