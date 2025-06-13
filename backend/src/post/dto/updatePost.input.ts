import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PostType } from '@prisma/client';

@InputType()
export class UpdatePostInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PostType)
  type: PostType;
}
