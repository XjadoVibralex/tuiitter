import { Controller, Param, Post ,Delete, Get} from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {

    constructor(private readonly followsService:FollowsService){}

    @Post(':followerId/:followedId')
    followerUser(@Param('followerId') followerId:number, @Param('followedId') followedId:number){
        return this.followsService.followUser(followerId,followedId);
    }

    @Delete(':followerId/:followedId')
    unfollowUser(@Param('followerId') followerId:number,@Param('followedId') followedId:number){
        return this.followsService.unfollowUser(followerId,followedId);
    }

    @Get('followers-count/:userId')
    getFollowersCount(@Param('userId') userId:number){
        return this.followsService.countFollowers(userId);
    }

    @Get('following-count/:userId')
    getFollowingCount(@Param('userId') userId:number){
        return this.followsService.countFollowing(userId);
    }
}
