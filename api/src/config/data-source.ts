import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/modules/**/*.entity{.ts,.js}"],
  synchronize: false,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  migrations: ["src/migrations/*.ts"],
  migrationsRun: false,
});
