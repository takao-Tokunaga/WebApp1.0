import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Schedule as ScheduleModel } from './models/schedule.model';
import { CreateScheduleInput } from './dto/createSchedule.input';
import { Schedule } from '@prisma/client';
import { UpdateScheduleInput } from './dto/updateSchedule.input';

@Resolver(() => ScheduleModel)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => [ScheduleModel], { nullable: 'items' }) //空の配列を返却
  async getSchedules(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Schedule[]> {
    return await this.scheduleService.getSchedules(userId);
  }

  @Mutation(() => ScheduleModel)
  async createSchedule(
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(createScheduleInput);
  }

  @Mutation(() => ScheduleModel)
  async updateSchedule(
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
  ): Promise<Schedule> {
    return await this.scheduleService.updateSchedule(updateScheduleInput);
  }

  @Mutation(() => ScheduleModel)
  async deleteSchedule(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Schedule> {
    return await this.scheduleService.deleteSchedule(id);
  }
}
