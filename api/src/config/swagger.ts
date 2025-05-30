import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { IncidentModule } from "src/modules/incident/incident.module";
import { MonitorModule } from "src/modules/monitor/monitor.module";
import { UserModule } from "src/modules/user/user.module";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Uptime Ninja APIs")
    .setDescription("")
    .setVersion("1.0")
    .addTag("User", "Endpoints related to user management")
    .addTag("Monitor", "Endpoints related to monitoring URLs")
    .addTag("Incident", "Endpoints related to incident management")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    include: [UserModule, MonitorModule, IncidentModule],
  });

  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
