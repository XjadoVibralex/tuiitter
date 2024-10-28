import { Controller, Post,Body, Get, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Reaction, ReactionType } from './reaction.entity';

@Controller('reactions')
export class ReactionsController {
    constructor(private readonly reactionsService : ReactionsService){}

    @Post()
    async createReaction(@Body() createReactionDto: CreateReactionDto): Promise<Reaction>{
        return this.reactionsService.createReaction(createReactionDto);
    }

    @Delete(':id')
    async removeReaction(@Param('id') reactionId: number):Promise<void>{
        await this.reactionsService.removeReaction(reactionId);
    }

    @Get('tuit/:id')
    async getReactionsByTuit(@Param('id',ParseIntPipe)tuitID: number):Promise<{userId:number;username:string;type:ReactionType;createdAt:Date;reactionId:number;}[]>{
        return this.reactionsService.getReactionsByTuit(tuitID);
    }

    @Get('comment/:id')
    async getReactionsByComment(@Param('id',ParseIntPipe)commentId: number):Promise<{userId:number; username:string; type:ReactionType; createdAt:Date;reactionId:number;}[]>{
        return this.reactionsService.getReactionsByComment(commentId);
    }


}


