import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/users.entity';
import { CreateCommentDto,UpdateCommentDto } from './dto';



@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,

    ){}
   
    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepository.create({
            message:createCommentDto.message,
            user:{id:createCommentDto.userId},
            tuit:{id:createCommentDto.tuitId},
        });
        return this.commentRepository.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find({
            relations: [ 'tuit'], // Si deseas incluir datos del usuario y el tuit
        });
    }

    async findById(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['user', 'tuit'],
        });

        if (!comment) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }

        return comment;
    }

    async updateComment(id:number,{message}:UpdateCommentDto){
        const comment: Comment = await this.commentRepository.preload({
            id,
            message,
        });
        if(!comment){
            throw new NotFoundException('Comment not found')
        }
        return this.commentRepository.save(comment);
    }

    async removeComment(id:number):Promise<void>{
        const comment : Comment = await this.commentRepository.findOne({where:{id}});
        if(!comment){
            throw new NotFoundException('Resource not found')
        }

        await this.commentRepository.remove(comment);
    }
    

  
}
