import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AuthModule } from "src/modules/auth/auth.module";
import { IncidentModule } from "src/modules/incident/incident.module";
import { MonitorModule } from "src/modules/monitor/monitor.module";
import { UserModule } from "src/modules/user/user.module";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Uptime Ninja APIs")
    .setDescription("")
    .setVersion("1.0")
    .addTag("Auth", "Endpoints related to authentication")
    .addTag("User", "Endpoints related to user management")
    .addTag("Monitor", "Endpoints related to monitoring URLs")
    .addTag("Incident", "Endpoints related to incident management")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
      "JWT",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    include: [AuthModule, UserModule, MonitorModule, IncidentModule],
  });

  SwaggerModule.setup("swagger", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
