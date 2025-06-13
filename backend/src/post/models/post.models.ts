import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostType } from '@prisma/client';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  type: PostType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user: User;
}
