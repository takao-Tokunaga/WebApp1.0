import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/createTask.input';
import { Follow as FollowModel } from './models/follow.model';
import { FollowService } from './follow.service';
import { Follow } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async follow(
    @Args('followerId', { type: () => Int }) followerId: number,
    @Args('folloingId', { type: () => Int }) followingId: number,
  ): Promise<boolean> {
    await this.followService.follow(followerId, followingId);
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async unfollow(
    @Args('followerId', { type: () => Int }) followerId: number,
    @Args('followingId', { type: () => Int }) followingId: number,
  ): Promise<boolean> {
    await this.followService.unfollow(followerId, followingId);
    return true;
  }

  @Query(() => [Int])
  @UseGuards(JwtAuthGuard)
  async getFollowingIds(
    @Args('followingId', { type: () => Int }) followingId: number,
  ): Promise<number[]> {
    await this.followService.follow(followerId)

  }
}