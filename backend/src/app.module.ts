import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
// anesis:top-imports

@Module({
  imports: [
    // anesis:module-imports
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
