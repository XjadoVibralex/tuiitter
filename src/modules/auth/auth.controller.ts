import { Controller, Post,Body, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import {JwtAuthGuard} from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    // Endpoint para el inicio de sesión de usuarios
    @Post('login')
    async logear(@Body() loginUserDto: LoginUserDto) {
        return this.authService.logear(loginUserDto);
    }
   

    @UseGuards(JwtAuthGuard)
    @Post('protected')
    getProtectedData(@Request()req){

        return req.user;

    }


}
