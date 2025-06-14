import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/profile/models/profile.model';
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Profile, { nullable: true }) // ← これを追加！
  profile?: Profile;
}
