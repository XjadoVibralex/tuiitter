import { IsNumber, IsString } from "class-validator";
import { User } from "src/modules/users/users.entity";

export class CreateTuitDto {
    @IsString()
    readonly message: string;

    @IsNumber()
    readonly userId: number;
}
