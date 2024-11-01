import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcryptjs from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'authConnection')
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return this.userRepository.save(createUserDto);
  }

  findOneByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ["id", "firstName", "lastName", "email", "password", "role"],
    });
  }

  findOneByEmail(email: string) {
    // return 'This action find user by email';
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find({
      select: ["id", "firstName", "lastName",  "email", "role"],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.userRepository.update(id, { ...updateUserDto });
    const updatedUser = await this.findOne(id);
    return {
      message: "User updated successfully",
      user: updatedUser,
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleted = await this.userRepository.softDelete(id);

    return { message: "User delete successfully", deleted };
  }

  async updatePassword(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["password"],
    });

    const validatePassword = await bcryptjs.compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!validatePassword) {
      throw new BadRequestException("Invalid password, try again");
    }

    const newPassword = await bcryptjs.hash(updateUserDto.password, 12);
    await this.userRepository.update(id, { ...{ password: newPassword } });

    return {
      message: "Updated password successfully",
    };
  }
}
