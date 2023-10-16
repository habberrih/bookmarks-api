import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { PrismaController } from './controller/prisma.controller';

@Global()
@Module({
  providers: [PrismaService],
  controllers: [PrismaController],
  exports: [PrismaService],
})
export class PrismaModule {}
