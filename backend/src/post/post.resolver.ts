import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post.models';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Post as PrismaPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/models/user.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly prismaService: PrismaService,
  ) {}

  @Query(() => [Post], { nullable: true })
  @UseGuards(JwtAuthGuard)
  async getPost(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<PrismaPost[]> {
    return await this.postService.getPost(userId);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PrismaPost> {
    return this.postService.createPost(createPostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<PrismaPost> {
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<PrismaPost> {
    return await this.postService.deletePost(id, userId);
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post) {
    try {
      return await this.prismaService.user.findUnique({
        where: { id: post.userId },
        include: { profile: true },
      });
    } catch (err) {
      console.error('🔥 Prisma エラー:', err); // ← エラーログ
      throw err; // エラーを再スローして GraphQL に流す
    }
  }
}
