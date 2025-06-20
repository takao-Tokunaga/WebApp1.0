import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowService } from './follow.service';
@Resolver()
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  async follow(
    @Args('followerId', { type: () => Int }) followerId: number,
    @Args('folloingId', { type: () => Int }) followingId: number,
  ): Promise<boolean> {
    await this.followService.follow(followerId, followingId);
    return true;
  }

  @Mutation(() => Boolean)
  async unfollow(
    @Args('followerId', { type: () => Int }) followerId: number,
    @Args('followingId', { type: () => Int }) followingId: number,
  ): Promise<boolean> {
    await this.followService.unfollow(followerId, followingId);
    return true;
  }

  @Query(() => [Int])
  async getFollowingIds(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<number[]> {
    const followings = await this.followService.getFollowing(userId);
    return followings.map((f) => f.followingId);
  }
}
