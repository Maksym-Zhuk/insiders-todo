import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/generated/prisma/enums';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
