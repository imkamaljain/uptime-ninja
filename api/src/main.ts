import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cors from "cors";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { MyLoggerService } from "./common/services/my-logger.service";
import { corsConfig } from "./config/cors.config";
import { setupSwagger } from "./config/swagger";

async function bootstrap() {
  const logger: MyLoggerService = new MyLoggerService();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cors(corsConfig));

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
