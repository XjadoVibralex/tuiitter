import { ConflictException, HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto';
import {User} from '../users/users.entity';
import {Repository} from 'typeorm'
import { UsersModule } from '../users/users.module';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
       

    ){}

    async validateUser(username: string,password:string):Promise<any>{
        const user = await this.usersService.findByUsername(username);
        if(user && await bcrypt.compare(password,user.password)){
            const{password, ...result}= user;
            return result;
        }
        return null;
    }

    async logear(loginUserDto: LoginUserDto){

        const { username, password } = loginUserDto;
    
        // Validar al usuario con nombre de usuario y contraseña
        const user = await this.usersService.findByUsername(username);
        if(!user) throw new HttpException('usuario no encontrado',404);

        const chekPassword = await bcrypt.compare(password,user.password);
    
        // Si no se encuentra el usuario o las credenciales son inválidas
        if (!chekPassword) {
            throw new HttpException('Password no es valido',403);
        }
    
        // Si el usuario es válido, generar un token nuevo
        // el primer parametro debe ser id 
        const payload = { user: user.id, name: user.name };
        
        const accessToken = this.jwtService.sign(payload);

        const data ={

            user:user,
            accessToken
        }
    
        // Retornar el usuario y el nuevo token de acceso
        return data;
    }
    
    async register(registerUserDto: RegisterUserDto): Promise<{ user: User; access_token: string }> {
        // Busca si ya existe un usuario con el mismo username
        const existingUser = await this.usersService.findByUsername(registerUserDto.username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }
    
        // Hashea la contraseña
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    
        // Crea un nuevo usuario con la contraseña hasheada
        const newUser = await this.usersService.createUser({
            ...registerUserDto,
            password: hashedPassword,
        });
    
        // Genera el token para el nuevo usuario
        const payload = { username: newUser.username, sub: newUser.id };
        const accessToken = this.jwtService.sign(payload);
    
        // Retorna el nuevo usuario junto con el token
        return {
            user: newUser,
            access_token: accessToken,
        };
    }
    

}
