import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { LoginRequestDto } from "./dto/request/login-request.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginRequestDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
      select: ["id", "is_deleted"],
    });

    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    if (user.is_deleted) {
      throw new BadRequestException(
        "Your account has been deleted. Please contact support.",
      );
    }

    return {
      message: "Login successful",
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
