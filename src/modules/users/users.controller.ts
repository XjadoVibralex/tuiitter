import { Body, Controller,Delete,Get,Param,Post,Patch,NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}


    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':id') // Asegúrate de que esto esté configurado correctamente
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id); // Convierte id a número
        if (!user) {
            throw new NotFoundException('User not found'); // Manejo de error
        }
        return user;
    }

    @Patch(':id')
    updateUser(@Param('id')id: string,@Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUser(+id,updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id')id:string){
        return this.usersService.deleteUser(+id);
    }

    @Get(':id/profile')
    getUserProfile(@Param('id')id:number){
        return this.usersService.getUserProfile(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }
}
