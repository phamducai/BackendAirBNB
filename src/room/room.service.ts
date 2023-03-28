import { PrismaClient } from '@prisma/client';
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomDTO } from './dto/room.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}
  async getAllRooms(): Promise<RoomDTO[]> {
    try {
      const getAllroom = this.prismaService.room.findMany();
      return getAllroom;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getRoomsByLocation(id: number): Promise<RoomDTO[]> {
    try {
      const getAllroombyLocation = this.prismaService.room.findMany({
        where: {
          location_id: id,
        },
      });
      return getAllroombyLocation;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async postRoom(roomDTO: RoomDTO): Promise<RoomDTO> {
    try {
      const Postroom = await this.prismaService.room.create({
        data: roomDTO,
      });
      return Postroom;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async updateRoom(id: number, roomDTO: RoomDTO): Promise<RoomDTO> {
    try {
      const Postroom = await this.prismaService.room.update({
        where: {
          id: id,
        },
        data: roomDTO,
      });

      return Postroom;
    } catch (error) {
      const { code } = error;
      if (code === 'P2025') {
        throw new NotFoundException('Not Found room ' + id);
      }

      throw new BadRequestException();
    }
  }

  async getPhanTrangTimKiem(
    limit: number,
    page: number,
    search: string,
  ): Promise<{ data: RoomDTO[]; meta: object }> {
    const take = limit || 10;
    const skip = (page - 1) * take || 0;
    const searchs = search || '';

    try {
      const [data, total] = await Promise.all([
        this.prismaService.room.findMany({
          where: {
            room_name: {
              contains: searchs,
            },
          },
          skip: skip,
          take: take,
          orderBy: {
            room_name: 'asc',
          },
        }),
        this.prismaService.room.count({
          where: {
            room_name: {
              contains: searchs,
            },
          },
        }),
      ]);
      const meta = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
      return {
        data,
        meta,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getroomById(id: number): Promise<any> {
    try {
      const roombyid = await this.prismaService.room.findUnique({
        where: {
          id: id,
        },
      });

      if (!roombyid) {
        throw new NotFoundException();
      }

      return roombyid;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteRoom(id: number): Promise<RoomDTO> {
    try {
      const deleteroom = await this.prismaService.room.delete({
        where: {
          id: id,
        },
      });

      return deleteroom;
    } catch (error) {
      const { code } = error;

      if (code === 'P2025') {
        throw new NotFoundException('Not Found room ' + id);
      }

      throw new BadRequestException();
    }
  }
}
