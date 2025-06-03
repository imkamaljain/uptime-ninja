import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SslCheckerService } from "src/common/services/ssl-checker.service";
import { Repository } from "typeorm";
import { AddMonitorRequestDto } from "./dto/request/add-monitor-request.dto";
import { Monitor } from "./monitor.entity";

@Injectable()
export class MonitorService {
  constructor(
    @InjectRepository(Monitor)
    private monitorRepository: Repository<Monitor>,
    private readonly sslCheckerService: SslCheckerService,
  ) {}

  async getAllMonitor(user_id: string) {
    const data = await this.monitorRepository.findBy({ user_id });
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
