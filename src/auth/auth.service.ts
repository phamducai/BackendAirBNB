/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async register(authDTO: AuthDTO): Promise<AuthDTO> {
    const hashedPassword = await argon.hash(authDTO.pass_word);

    try {
      const user = await this.prismaService.users.create({
        data: {
          name: authDTO.name,
          email: authDTO.email,
          pass_word: hashedPassword,
          phone: authDTO.phone,
          birth_day: authDTO.birth_day,
          gender: authDTO.gender,
          role: authDTO.role,
        },
      });
      delete user.pass_word;
      return user;
    } catch (error) {
      const { code } = error;
      if (code === 'P2002') {
        console.log(error);
        throw new ForbiddenException('User with this email already exists');
      }
      throw new BadRequestException('bad request');
    }
  }
  async login(authDTO: AuthDTO) {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email: authDTO.email,
        },
      });
      if (!user) {
        throw new NotFoundException('Password or Email Incorrect');
      }

      const passwordMatched = await argon.verify(
        user.pass_word,
        authDTO.pass_word,
      );

      if (!passwordMatched) {
        throw new ForbiddenException('Password or Email Incorrect');
      }
      delete user.pass_word;

      return user;
    } catch (error) {}
  }
}
