import { Injectable } from '@nestjs/common';
import { CreateScheduleInput } from './dto/createSchedule.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Schedule } from '@prisma/client';
import { UpdateScheduleInput } from './dto/updateSchedule.input';

@Injectable()
export class ScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSchedules(userId: number): Promise<Schedule[]> {
    return await this.prismaService.schedule.findMany({
      where: { userId },
    });
  }

  async createSchedule(
    createScheduleInput: CreateScheduleInput,
  ): Promise<Schedule> {
    const { title, dueDate, description, userId } = createScheduleInput;
    return await this.prismaService.schedule.create({
      data: {
        title,
        dueDate,
        description,
        userId,
      },
    });
  }

  async updateSchedule(
    updatescheduleInput: UpdateScheduleInput,
  ): Promise<Schedule> {
    const { id, title, dueDate, description } = updatescheduleInput;
    return await this.prismaService.schedule.update({
      data: { title, dueDate, description },
      where: { id },
    });
  }

  async deleteSchedule(id: number): Promise<Schedule> {
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id,
      },
    });

    if (!schedule) {
      throw new Error(`スケジュールID ${id} が見つかりません`);
    }
    return await this.prismaService.schedule.delete({
      where: { id },
    });
  }
}
