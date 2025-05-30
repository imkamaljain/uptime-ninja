import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { MyLoggerService } from "./common/services/my-logger.service";
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

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
