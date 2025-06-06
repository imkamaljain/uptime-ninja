import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { User } from "src/common/decorators/user.decorator";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserRegisterRequestDto } from "./dto/request/user-register-request.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth("JWT")
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUser(@User("id") id: string) {
    return this.userService.getUser(id);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: UserRegisterRequestDto) {
    return this.userService.register(body);
  }

  @ApiBearerAuth("JWT")
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() body: UpdateUserRequestDto, @User("id") id: string) {
    return this.userService.updateUser(body, id);
  }

  @ApiBearerAuth("JWT")
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@User("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
