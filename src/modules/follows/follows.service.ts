import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { Follow } from './follow.entity';
import { User } from '../users/users.entity';

@Injectable()
export class FollowsService {

    constructor(
        @InjectRepository(Follow) private followsRepository: Repository<Follow>,
    ){}

    async followUser(followerId:number,followedId:number):Promise<Follow>{
        
        const follow = this.followsRepository.create({followerId,followedId});
        
        return this.followsRepository.save(follow);

    }

    async unfollowUser(followerId:number,followedId:number):Promise<void>{

        await this.followsRepository.delete({followerId,followedId});

    }

    async getFollowers(userId:number):Promise<Follow[]>{

        return this.followsRepository.find({where:{followedId:userId}});

    }

    async getFollowing(userId:number):Promise<Follow[]>{
        return this.followsRepository.find({where:{followerId:userId}});
    }

    async countFollowers(userId:number):Promise<number>{
        return this.followsRepository.count({where:{followedId:userId}});
    }

    async countFollowing(userId:number):Promise<number>{
        return this.followsRepository.count({where:{followerId:userId}});
    }
}
