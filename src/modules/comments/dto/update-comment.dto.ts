import { IsString } from "class-validator";

export class UpdateCommentDto {
    @IsString()
    readonly message: string;
}
