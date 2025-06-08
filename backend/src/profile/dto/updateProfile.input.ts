import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  displayName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  bio?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  goal?: string | null;
}
