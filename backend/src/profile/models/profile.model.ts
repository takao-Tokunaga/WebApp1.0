import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  goal?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
