import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FollowsModule } from '../follows/follows.module';


@Module({
    imports: [TypeOrmModule.forFeature([User]),FollowsModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports:[UsersService]
 
})
export class UsersModule {}
