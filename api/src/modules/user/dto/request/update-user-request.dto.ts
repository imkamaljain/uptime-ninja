import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
} from "class-validator";

export class UpdateUserRequestDto {
  @ApiProperty({
    required: false,
    description: "Name",
    example: "kamal jain",
  })
  @IsString({
    message: "Name must be a string",
  })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    required: false,
    description: "Email",
    example: "kamaljain1423@gmail.com",
  })
  @IsEmail(
    {},
    {
      message: "Email must be a valid email",
    },
  )
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    required: false,
    description: "Email Preference",
    example: true,
  })
  @IsBoolean({
    message: "Email preference must be a boolean",
  })
  @IsOptional()
  readonly email_opt_in?: boolean;

  @ApiProperty({
    required: false,
    description: "Slack Webhhook URL",
    example: "https://hooks.slack.com/services/...",
  })
  @ValidateIf((o) => o.slack_webhook_url !== "" && o.slack_webhook_url !== null)
  @IsUrl(
    {},
    {
      message: "Slack Webhook URL must be a valid URL",
    },
  )
  @IsOptional()
  readonly slack_webhook_url?: string;
}
