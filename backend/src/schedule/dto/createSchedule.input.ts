import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsDateString()
  dueDate: string;

  @Field({ nullable: true })
  description?: string; // nullを許容する

  @Field(() => Int)
  userId: number; // ユーザーIDはオプションとして追加
}
