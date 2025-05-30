import { HttpModule } from "@nestjs/axios";
import { MiddlewareConsumer, Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { UserAuthMiddleware } from "src/middlewares/user-auth.middleware";
import { IncidentModule } from "../incident/incident.module";
import { MonitorController } from "./monitor.controller";
import { Monitor } from "./monitor.entity";
import { MonitorService } from "./monitor.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Monitor]),
    forwardRef((): typeof CommonModule => CommonModule),
    IncidentModule,
    HttpModule,
  ],
  providers: [MonitorService],
  controllers: [MonitorController],
  exports: [TypeOrmModule],
})
export class MonitorModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes("monitor");
  }
}
