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
}
