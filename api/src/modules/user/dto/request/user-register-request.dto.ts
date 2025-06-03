import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserRegisterRequestDto {
  @ApiProperty({
    required: true,
    description: "Name",
    example: "John Doe",
  })
  @IsString({
    message: "Name must be a string",
  })
  @IsNotEmpty({
    message: "Name is required",
  })
  name: string;

  @ApiProperty({
    required: true,
    description: "Email",
    example: "john.doe@email.com",
  })
  @IsString({
    message: "Email must be a string",
  })
  @IsNotEmpty({
    message: "Email is required",
  })
  email: string;

  @ApiProperty({
    required: true,
    description: "Password",
    example: "password123",
  })
  @IsString({
    message: "Password must be a string",
  })
  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;
}
