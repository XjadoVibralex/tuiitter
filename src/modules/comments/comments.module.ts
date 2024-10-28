import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {Comment} from '../comments/comment.entity'
import { User } from '../users/users.entity';
import { Tuit } from '../tuits/tuit.entity';



@Module({
    imports: [TypeOrmModule.forFeature([Comment,User,Tuit])],
    controllers:[CommentsController],
    providers:[CommentsService],
    exports: [TypeOrmModule], 
    
})
export class CommentsModule {}
