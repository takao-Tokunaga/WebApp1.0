import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateScheduleInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional() // フィールドがある場合vaidateを行う
  title?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  userId: number;
}
