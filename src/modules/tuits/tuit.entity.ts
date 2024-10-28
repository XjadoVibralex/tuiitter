import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Comment } from "../comments/comment.entity";

@Entity()
export class Tuit{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    message: string;
  
    @ManyToOne((type) => User, (user) => user.tuits, { onDelete: 'CASCADE' })
    @JoinColumn({name:'user_id'})
    user: User;

    @OneToMany(type=> Comment,(comment)=>comment.tuit,{cascade:['remove']})
    comments: Comment[]

}