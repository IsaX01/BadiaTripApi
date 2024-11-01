import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from "bcryptjs"
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register( registerDto: RegisterDto ) {
    const user = await this.usersService.findOneByEmail(registerDto.email);

    if (user) {
        throw new BadRequestException('User already exists');
    }
    registerDto.password = await bcryptjs.hash(registerDto.password, 12)
    await this.usersService.create(registerDto);
    return {
      message: "User created successfully",
    };
  }

  async login( loginDto: LoginDto ) {
    const user = await this.usersService.findOneByEmailWithPassword(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(("Invalid email"));
    }

    const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);

    if(!isPasswordValid) {
      throw new UnauthorizedException(("Invalid password"));
    }

    const payload = { email: user.email, role: user.role};

    const token = await this.jwtService.signAsync(payload);

    return {
      data: {
        "token": token,
        "name": user.firstName + " " + user.lastName,
        "email": user.email,
        "role": user.role
      },
    };
  }
}
