import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsNumber()
    tuitId: number; // ID del tuit al que se está comentando

    @IsNotEmpty()
    @IsNumber()
    userId: number; // ID del usuario que está haciendo el comentario
}
