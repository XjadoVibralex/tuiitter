import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tuit } from "src/modules/tuits/tuit.entity";
import { Comment } from "src/modules/comments/comment.entity";

import { Follow } from "../follows/follow.entity";
import { Reaction } from "../reactions/reaction.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false})
    name: string;
    
    @Column({nullable:false})
    email: string;
    
    @Column({nullable:false})
    username:string;
    
    @Column({nullable:false})
    password:string;
    
    @OneToMany(type=> Tuit, (tuit)=> tuit.user,{cascade:true})
    tuits: Tuit[];

    @OneToMany(() => Comment, (comment) => comment.user, { cascade: ['remove'] }) 
    comments: Comment[];

    @OneToMany(()=>Follow,(follow)=>follow.followed)
    followers:Follow[]

    @OneToMany(()=>Follow,(follow)=>follow.follower)
    following: Follow[]

    @OneToMany(()=>Reaction,(reaction)=> reaction.user)
    reactions:Reaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}