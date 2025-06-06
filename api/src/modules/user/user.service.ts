import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserRegisterRequestDto } from "./dto/request/user-register-request.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<Partial<User>> {
    const user: Partial<User> = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ["id", "name", "email", "email_opt_in", "slack_webhook_url"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async register(body: UserRegisterRequestDto): Promise<string> {
    const user: User = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    await this.userRepository.save(user);
    return "User registered successfully";
  }

  async updateUser(body: UpdateUserRequestDto, id: string): Promise<string> {
    const { name, email, email_opt_in, slack_webhook_url } = body;
    const updateResult: UpdateResult = await this.userRepository.update(
      {
        id,
      },
      {
        name,
        email,
        email_opt_in,
        slack_webhook_url,
      },
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException("User not found");
    }
    return "User updated successfully";
  }

  async deleteUser(id: string) {
    await this.userRepository.update(
      {
        id,
      },
      {
        is_deleted: true,
      },
    );
    return "User deleted successfully";
  }
}
