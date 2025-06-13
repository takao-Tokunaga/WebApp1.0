import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { PostType } from '@prisma/client';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(PostType)
  type: PostType;

  @Field(() => Int)
  @IsNotEmpty()
  userId: number;
}
