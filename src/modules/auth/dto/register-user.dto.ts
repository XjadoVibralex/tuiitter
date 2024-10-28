import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto{

    @IsString()
    readonly name: string;

    @IsString()
    readonly username:string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

}




