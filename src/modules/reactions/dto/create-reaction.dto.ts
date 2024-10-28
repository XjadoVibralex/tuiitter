import { IsEnum, IsInt, IsOptional, ValidateIf, } from "class-validator";
import { ReactionType } from "../reaction.entity";

export class CreateReactionDto{

    @IsInt()
    userId: number;


    @ValidateIf(o => !o.commentId)
    @IsOptional()
    @IsInt()
    tuitId?: number;

    @ValidateIf(o => !o.tuitId)
    @IsOptional()
    @IsInt()
    commentId?: number;

    @IsEnum(ReactionType)
    type:ReactionType;
}