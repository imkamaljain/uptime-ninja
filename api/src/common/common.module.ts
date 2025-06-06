import { HttpModule } from "@nestjs/axios";
import { Module, forwardRef } from "@nestjs/common";
import { IncidentModule } from "src/modules/incident/incident.module";
import { MonitorModule } from "src/modules/monitor/monitor.module";
import { CronService } from "./services/cron.service";
import { EmailService } from "./services/email.service";
import { MyLoggerService } from "./services/my-logger.service";
import { SlackService } from "./services/slack.service";
import { SslCheckerService } from "./services/ssl-checker.service";

@Module({
  imports: [
    HttpModule,
    forwardRef((): typeof MonitorModule => MonitorModule),
    forwardRef((): typeof IncidentModule => IncidentModule),
  ],
  providers: [
    MyLoggerService,
    SslCheckerService,
    EmailService,
    CronService,
    SlackService,
  ],
  exports: [MyLoggerService, SslCheckerService, EmailService, SlackService],
})
export class CommonModule {}
