import { Module } from '@nestjs/common';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
