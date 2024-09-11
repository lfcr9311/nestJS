import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
  imports: [AuthModule],
})
export class AppModule {}
