import { Controller, Post, Body ,Get,Param, Delete,Patch, NotFoundException} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { UpdateCommentDto } from './dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<Comment[]> {
        return this.commentsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<Comment> {
        return this.commentsService.findById(id);
    }


    @Patch(':id')
    async updateComment(
        @Param('id')id:number,
        @Body() UpdateCommentDto : UpdateCommentDto,
    ){
        const updateComment = await this.commentsService.updateComment(id,UpdateCommentDto);
        if(!updateComment){
            throw new NotFoundException(`Comment with ID ${id} not found`);

        }
        return updateComment;
    }

    @Delete(':id')
    removeComment(@Param('id') id:number):Promise<void>{
        return this.commentsService.removeComment(id);
    }
}
