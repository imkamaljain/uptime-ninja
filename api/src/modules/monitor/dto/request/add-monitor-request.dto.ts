import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

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
}
