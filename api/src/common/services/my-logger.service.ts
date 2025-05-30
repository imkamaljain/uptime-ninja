import { Injectable, LoggerService } from "@nestjs/common";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Logger, QueryRunner } from "typeorm";
import { ConsoleColors } from "../enums/console-colors.enum";

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class MyLoggerService implements Logger, LoggerService {
  private getTimestamp(): string {
    const timestamp: string = dayjs()
      .tz("Asia/Kolkata")
      .format("MMM DD hh:mm:ss A");
    return `${ConsoleColors.BrightBlack}${timestamp}${ConsoleColors.Reset}`;
  }

  log(message: string): void {
    console.log(`${this.getTimestamp()} LOG - ${message}`);
  }

  error(message: string): void {
    console.error(`${this.getTimestamp()} ERROR - ${message}`);
  }

  warn(message: string): void {
    console.warn(`${this.getTimestamp()} WARNING - ${message}`);
  }

  debug?(message: string): void {
    console.debug(`${this.getTimestamp()} DEBUG - ${message}`);
  }

  verbose?(message: string): void {
    console.log(`${this.getTimestamp()} VERBOSE - ${message}`);
  }

  logQuery(
    query: string,
    parameters?: any[],
    _queryRunner?: QueryRunner,
  ): void {
    const formattedQuery = `${ConsoleColors.Green}${query}${ConsoleColors.Reset}${ConsoleColors.Dim}${parameters ? ` -- ${JSON.stringify(parameters)}` : ""}${ConsoleColors.Reset}`;
    console.log(`${this.getTimestamp()} QUERY - ${formattedQuery}`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    _queryRunner?: QueryRunner,
  ): void {
    const formattedQuery = `${query}${parameters ? ` -- ${JSON.stringify(parameters)}` : ""}`;
    console.error(
      `${this.getTimestamp()} QUERY ERROR - ${formattedQuery} - ${error}`,
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    _queryRunner?: QueryRunner,
  ): void {
    const formattedQuery = `${ConsoleColors.Yellow}${query}${ConsoleColors.Reset}${ConsoleColors.Dim}${parameters ? `-- ${JSON.stringify(parameters)}` : ""}${ConsoleColors.Reset}`;
    console.warn(
      `${this.getTimestamp()} SLOW QUERY - ${formattedQuery} took ${time}ms`,
    );
  }

  logMigration(message: string): void {
    console.log(
      `${this.getTimestamp()} MIGRATION - ${ConsoleColors.Magenta}${message}${ConsoleColors.Reset}`,
    );
  }

  logSchemaBuild(message: string): void {
    console.log(`${this.getTimestamp()} SCHEMA BUILD - ${message}`);
  }
}
