import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreatePostInput } from './dto/createPost.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePostInput } from './dto/updatePost.input';
import { Post as PrismaPost } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getPost(userId: number): Promise<PrismaPost[]> {
    return this.prismaService.post.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            profile: {
              select: { displayName: true },
            },
          },
        },
      },
    });
  }

  async createPost(createPostInput: CreatePostInput): Promise<PrismaPost> {
    const { description, type, userId } = createPostInput;
    return await this.prismaService.post.create({
      data: {
        description,
        type,
        userId,
      },
    });
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<PrismaPost> {
    const { id, description, type } = updatePostInput;
    return await this.prismaService.post.update({
      data: { id, description, type },
      where: { id },
    });
  }

  async deletePost(id: number, userId: number): Promise<PrismaPost> {
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post || post.userId !== userId) {
      throw new ForbiddenException('この投稿を削除する権限がありません');
    }
    return await this.prismaService.post.delete({
      where: { id },
    });
  }

  // 全てのPostデータを取得
  async getAllPosts(): Promise<PrismaPost[]> {
    return this.prismaService.post.findMany({
      include: {
        user: {
          include: { profile: true },
        },
      },
      // 投稿作成日時で新しい順に並び替え
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // フォローしているユーザーのPostデータを取得
  async getPostsFromFollowedUsers(userId: number): Promise<PrismaPost[]> {
    //フォローしているユーザーのIDを取得
    const followed = await this.prismaService.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = followed.map((f) => f.followingId);
    const posts = await this.prismaService.post.findMany({
      where: {
        userId: { in: followingIds },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }
}
