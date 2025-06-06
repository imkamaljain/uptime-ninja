import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./dto/request/login-request.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body: LoginRequestDto) {
    return this.authService.login(body);
  }
}
