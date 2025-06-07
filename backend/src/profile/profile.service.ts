import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/createProfile.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { Profile as PrismaProfile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: number): Promise<PrismaProfile | null> {
    return this.prismaService.profile.findFirst({
      where: { userId },
    });
  }

  async createProfile(
    createProfileInput: CreateProfileInput,
  ): Promise<PrismaProfile> {
    const { displayName, bio, goal, userId } = createProfileInput;
    return this.prismaService.profile.create({
      data: {
        displayName,
        bio,
        goal,
        userId,
      },
    });
  }

  async updateProfile(
    updateProfileInput: UpdateProfileInput,
  ): Promise<PrismaProfile> {
    const { id, displayName, bio, goal } = updateProfileInput;
    return await this.prismaService.profile.update({
      data: { id, displayName, bio, goal },
      where: { id },
    });
  }
}
