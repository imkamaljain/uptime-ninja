import { Body, Controller, Post } from "@nestjs/common";
import { UserRegisterRequestDto } from "./dto/request/user-register-request.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() body: UserRegisterRequestDto) {
    return this.userService.register(body);
  }
}
