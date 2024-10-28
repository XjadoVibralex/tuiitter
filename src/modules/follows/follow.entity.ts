import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class Follow{

    @PrimaryColumn()
    followerId: number;

    @PrimaryColumn()
    followedId: number;

    @ManyToOne(()=>User,(user)=> user.following)
    follower:User;

    @ManyToOne(()=>User,(user)=>user.followers)
    followed:User;
}