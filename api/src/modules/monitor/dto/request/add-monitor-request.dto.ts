import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsDefined,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from "class-validator";

export class AddMonitorRequestDto {
  @ApiProperty({
    description: "monitor name",
    example: "monitor name",
    required: true,
  })
  @IsDefined({
    message: "monitor name is required",
  })
  @IsString({
    message: "monitor name must be a string",
  })
  name: string;

  @ApiProperty({
    description: "monitor url",
    example: "https://google.com",
    required: true,
  })
  @IsDefined({
    message: "monitor url is required",
  })
  @IsString({
    message: "monitor url must be a string",
  })
  url: string;

  @ApiProperty({
    description: "monitor check interval in minutes",
    example: 5,
    required: false,
    default: 1,
    minimum: 1,
    maximum: 60,
  })
  @Transform(({ value }) => Number.parseInt(value, 10))
  @IsPositive({
    message: "monitor check interval must be a positive number",
  })
  @Min(1, {
    message: "monitor check interval must be at least 1 minute",
  })
  @Max(60, {
    message: "monitor check interval must be at most 60 minutes",
  })
  @IsOptional()
  check_interval_minutes: number;
}
