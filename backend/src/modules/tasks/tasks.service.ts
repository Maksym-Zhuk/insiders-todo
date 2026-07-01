import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { description: '', ...createTaskDto, userId },
    });
  }

  findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  findOne(userId: string, id: string) {
    return this.prisma.task.findFirstOrThrow({ where: { id, userId } });
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(userId, id);
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.task.delete({ where: { id } });
  }
}
