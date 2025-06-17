import { Injectable } from '@nestjs/common';
import { Follow } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFollow(followerId: number, followingId: number): Promise<Follow> {
    return await this.prismaService.follow.create({
      data: { followerId, followingId },
    });
  }
}
