import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async login() {
    return {
      code: 200,
      message: "Login success",
    };
  }
}
