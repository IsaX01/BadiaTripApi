import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail, IsStrongPassword, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim())
    @IsStrongPassword()
    password?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim())
    @IsStrongPassword()
    oldPassword?: string;
}
