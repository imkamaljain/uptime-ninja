import { MiddlewareConsumer, Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { UserAuthMiddleware } from "src/middlewares/user-auth.middleware";
import { IncidentController } from "./incident.controller";
import { Incident } from "./incident.entity";
import { IncidentService } from "./incident.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Incident]),
    forwardRef((): typeof CommonModule => CommonModule),
  ],
  controllers: [IncidentController],
  providers: [IncidentService],
  exports: [TypeOrmModule, IncidentService],
})
export class IncidentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAuthMiddleware).forRoutes("incident");
  }
}
