import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Follow {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  followerId: number;

  @Field(() => Int)
  followingId: number;

  @Field()
  createdAt: Date;
}
