/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentsModule } from './comments/comments.module';
import { BookroomController } from './bookroom/bookroom.controller';
import { BookroomModule } from './bookroom/bookroom.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CommentsModule,
    BookroomModule,
    UserModule,
    RoomModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
