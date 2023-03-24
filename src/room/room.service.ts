import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomDTO } from './dto/room.dto';

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
      const getAllroom = this.prismaService.room.findMany({
        where: {
          location_id: id,
        },
      });
      return getAllroom;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
