import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRegisterRequestDto } from "./dto/request/user-register-request.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(body: UserRegisterRequestDto): Promise<string> {
    const user: User = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    await this.userRepository.save(user);
    return "User registered successfully";
  }
}
