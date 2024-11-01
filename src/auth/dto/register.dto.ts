import { Transform } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";


export class RegisterDto {
    @IsString()
    @MinLength(3)
    @Transform(({value}) => value.trim())
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim())
    @IsStrongPassword()
    password: string;

}