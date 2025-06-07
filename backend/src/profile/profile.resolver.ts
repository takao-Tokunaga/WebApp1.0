import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { CreateProfileInput } from './dto/createProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile as PrismaProfile } from '@prisma/client';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<PrismaProfile | null> {
    return await this.profileService.getProfile(userId);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<PrismaProfile> {
    return this.profileService.createProfile(createProfileInput);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<PrismaProfile> {
    return await this.profileService.updateProfile(updateProfileInput);
  }
}
