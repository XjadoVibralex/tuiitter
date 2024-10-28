import { Injectable, NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import {FollowsService}  from '../follows/follows.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly followsService:FollowsService
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }
    

    async findAll(): Promise<User[]>{
        return await this.usersRepository.find({relations:['tuits','comments']});

    }

    async findByUsername(username:string):Promise<User >{
        return this.usersRepository.findOne({where:{username}});

    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['tuits', 'comments'],
        });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user;
    }

    async updateUser(id:number,updateUserDto:UpdateUserDto):Promise<User>{
        await this.usersRepository.update(id,updateUserDto);
        return this.findOne(id);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['tuits', 'comments'] });
    
        if (!user) {
            throw new NotFoundException('User not Found');
        }
    
        // Solo necesitas eliminar el usuario, los tuits y comentarios se eliminarán automáticamente
        await this.usersRepository.delete(id);
    }

    async getUserProfile(userId:number){
        const user = await this.usersRepository.findOne({ where: { id: userId}});
        const followersCount = await this.followsService.countFollowers(userId);
        const followingCount = await this.followsService.countFollowing(userId);

        return{
            ...user,
            followersCount,
            followingCount
        };

    }
    
}
