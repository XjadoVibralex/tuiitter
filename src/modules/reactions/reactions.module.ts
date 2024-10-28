import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './reaction.entity';
import { Tuit } from '../tuits/tuit.entity';
import { Comment } from '../comments/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reaction,Tuit,Comment])],
  providers: [ReactionsService],
  controllers: [ReactionsController]
})
export class ReactionsModule {}
