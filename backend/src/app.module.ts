import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
// anesis:top-imports

@Module({
  imports: [
    // anesis:module-imports
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: PrismaExceptionFilter }],
})
export class AppModule {}
