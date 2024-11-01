import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim())
    password: string;
} 