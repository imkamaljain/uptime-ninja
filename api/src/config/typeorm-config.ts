import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { MyLoggerService } from "src/common/services/my-logger.service";
import { DataSource } from "typeorm";

export const typeOrmConfig = TypeOrmModule.forRootAsync({
  imports: [CommonModule],
  inject: [MyLoggerService],
  useFactory: async (logger: MyLoggerService) => {
    const dataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      logging: true,
      logger,
      migrations: ["dist/migrations/*{.ts,.js}"],
      migrationsTableName: "migrations",
    });

    try {
      await dataSource.initialize();
      console.log(`Database connected to ${dataSource.options.database}`);
    } catch (error) {
      console.error(`Database connection failed: ${error.message}`);
      process.exit(1);
    }

    return dataSource.options;
  },
});
