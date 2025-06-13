import { Module } from '@nestjs/common';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ScheduleResolver, ScheduleService],
})
export class ScheduleModule {}
