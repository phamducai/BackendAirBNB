/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(authDTO: AuthDTO): Promise<AuthDTO> {
    console.log(authDTO);
    const hashedPassword = await argon.hash(authDTO.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: authDTO.name,
          email: authDTO.email,
          password: hashedPassword,
          phone: authDTO.phone,
          birthday: new Date(authDTO.birthday),
          gender: authDTO.gender,
          role: authDTO.role,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      const { code } = error;
      if (code === 'P2002') {
        throw new ForbiddenException('User with this email already exists');
      }
      throw new BadRequestException('bad request');
    }
  }
  async login(authDTO: AuthDTO) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email: authDTO.email,
        },
      });
      if (!user) {
        throw new NotFoundException('Password or Email Incorrect');
      }
      console.log(user);
      const passwordMatched = await argon.verify(
        user.password,
        authDTO.password,
      );
      console.log(authDTO);
      if (!passwordMatched) {
        throw new ForbiddenException('Password or Email Incorrect');
      }
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
