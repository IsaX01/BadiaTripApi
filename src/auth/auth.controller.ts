import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-users.decorator';
import { requestWithUser } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    // @Roles(Role.USER)
    // @UseGuards(AuthGuard, RolesGuard)
    @Auth(Role.USER)
    @Get('profile')
    profile(
        // @Req() 
        // req : requestWithUser
        @ActiveUser() user: requestWithUser
    ) {
        return user;
    }
}
