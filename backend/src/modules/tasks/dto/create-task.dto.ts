import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

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
