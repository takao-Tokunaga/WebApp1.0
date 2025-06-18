import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  displayName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  goal?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  imageUrl?: string | null;

  @Field(() => Int)
  userId: number;
}
