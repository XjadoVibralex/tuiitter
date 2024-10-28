import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Reaction, ReactionType } from './reaction.entity';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Tuit } from '../tuits/tuit.entity';
import {Comment} from '../comments/comment.entity';

@Injectable()
export class ReactionsService {

    constructor(

        @InjectRepository(Reaction)
        private reactionsRepository: Repository<Reaction>,

        @InjectRepository(Tuit)
        private tuitsRepository: Repository<Tuit>,

        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,

    ){}

    async createReaction(createReactionDto: CreateReactionDto): Promise<Reaction>{

        const {userId,type,tuitId,commentId} = createReactionDto;

        if(!tuitId && !commentId || tuitId && commentId){
            throw new BadRequestException('Specify either tuitId or commentId , not both.');
        }

        const existingReaction = await this.reactionsRepository.findOne({
            where: {
                user: { id:userId},
                ...(tuitId ? { tuit: { id: tuitId}} : { comment : { id:commentId}})
            },
            relations:['user', 'tuit', 'comment'],
        });

        if(existingReaction){
            existingReaction.type = type;
            return this.reactionsRepository.save(existingReaction);
        } 

        const reaction = this.reactionsRepository.create({
            user:{id:userId} as any,
            type,
            tuit: tuitId ? {id: tuitId} as any : undefined,
            comment: commentId ? {id:commentId} as any : undefined,
        });

        if(tuitId && !(await this.tuitsRepository.findOne({ where:{ id:tuitId}}))){
            throw new NotFoundException('Tuit not found');
        }

        if(commentId && !(await this.commentsRepository.findOne({ where:{id:commentId}}))){
            throw new NotFoundException('Comment not found');
        }

        return this.reactionsRepository.save(reaction);
       
     
    }

    async removeReaction(reactionId: number):Promise<DeleteResult>{
        const reaction= await this.reactionsRepository.findOne({where:{id:reactionId}});
        if(!reaction){
            throw new NotFoundException('Reaction not found');
        }

        return this.reactionsRepository.delete(reactionId);
    }

    async getReactionsByTuit(tuitId: number):Promise<{userId:number;username:string;type:ReactionType;createdAt:Date;reactionId:number;}[]>{

        const reactions = await this.reactionsRepository.find({
            where:{ tuit:{id:tuitId}},
            relations:['user'],
        });
        return reactions.map(reactions =>({
            reactionId:reactions.id,
            type: reactions.type,
            createdAt: reactions.createdAt,
            userId:reactions.user.id,
            username:reactions.user.name,
        }));
    }

    async getReactionsByComment(commentId: number): Promise<{userId: number; username: string; type:ReactionType; createdAt:Date;reactionId:number;}[]> {
       
        const reactions = await this.reactionsRepository.find({
            where: { comment: { id: commentId} },
            relations: ['user'],
        });

        return reactions.map(reaction =>({
            reactionId:reaction.id,
            type: reaction.type,
            createdAt: reaction.createdAt,
            userId: reaction.user.id,
            username: reaction.user.username,
            
        }));
       
       
       
    }
}
