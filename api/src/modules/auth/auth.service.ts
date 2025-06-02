import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(body: any) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }
    return {
      message: "Login successful",
      data: user,
    };
  }
}
