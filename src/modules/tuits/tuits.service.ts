import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
import { Tuit } from './tuit.entity';
import { User } from '../users/users.entity';
import{Comment} from '../comments/comment.entity';



@Injectable()
export class TuitsService {
   
    constructor(
        @InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    ){}

    async getTuits({limit,offset}:PaginationQueryDto): Promise<Tuit[]>{
        return await this.tuitRepository.find({
            relations:['user','comments'],
            skip:offset,
            take:limit,
        });
    }

    async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOne({
            where: { id },
            relations: ['user', 'comments'],  // Asegúrate de incluir 'comments' aquí
        });
    
        if (!tuit) {
            throw new NotFoundException('Resource not found');
        }
    
        return tuit;
    }

    async createTuit({ message, userId }: CreateTuitDto) {
        // Verificamos si el usuario existe usando el userId proporcionado
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });
    
        if (!existingUser) {
            throw new Error('User not found'); // Si el usuario no existe, lanzamos un error
        }
    
        // Creamos el tuit con el usuario existente
        const tuit: Tuit = this.tuitRepository.create({ message, user: existingUser });
    
        // Guardamos el tuit en la base de datos
        return this.tuitRepository.save(tuit);
    }

   async updateTuit(id:number,{message}:UpdateTuitDto){
    const tuit: Tuit = await this.tuitRepository.preload({
        id,
        message,
    });

    if(!tuit){
        throw new NotFoundException('resource not found');
    }
    return this.tuitRepository.save(tuit);

   }

   async removeTuit(id:number):Promise<void>{
    const tuit : Tuit = await this.tuitRepository.findOne({
        where:{id},
        relations:['comments'],
    });

    if(!tuit){
        throw new NotFoundException('Resource not found')
    }

    await this.commentRepository.remove(tuit.comments)

    await this.tuitRepository.remove(tuit);

   }
 
}
