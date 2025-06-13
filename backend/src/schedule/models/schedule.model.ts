import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Schedule {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  dueDate: string;

  @Field({ nullable: true }) // nullを許容する
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
