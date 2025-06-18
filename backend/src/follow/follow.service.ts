import { Injectable } from '@nestjs/common';
import { Follow } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) {}

  async follow(followerId: number, followingId: number): Promise<Follow> {
    return await this.prismaService.follow.create({
      data: { followerId, followingId },
    });
  }

  async unfollow(followerId: number, followingId: number): Promise<Follow> {
    return this.prismaService.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async getFollowing(userId: number) {
    return this.prismaService.follow.findMany({
      where: { followingId: userId },
      include: { following: true },
    });
  }

  async getFollowers(userId: number) {
    return this.prismaService.follow.findMany({
      where: { followerId: userId },
      include: { follower: true },
    });
  }
}
