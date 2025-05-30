import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import * as dotenv from "dotenv";
import { AppController } from "./app.controller";
import { CommonModule } from "./common/common.module";
import { typeOrmConfig } from "./config/typeorm-config";
import { AuthModule } from "./modules/auth/auth.module";
import { IncidentModule } from "./modules/incident/incident.module";
import { MonitorModule } from "./modules/monitor/monitor.module";
import { UserModule } from "./modules/user/user.module";

dotenv.config();

@Module({
  imports: [
    typeOrmConfig,
    ScheduleModule.forRoot(),
    UserModule,
    MonitorModule,
    IncidentModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
