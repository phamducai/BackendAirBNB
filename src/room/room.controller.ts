import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RoomDTO } from './dto/room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private roomService: RoomService) {}
  @Get('all')
  getRooms(): Promise<RoomDTO[]> {
    return this.roomService.getAllRooms();
  }

  @Get('location')
  getUsers(@Query('id', ParseIntPipe) id: number) {
    // logic to get users with pagination
    return this.roomService.getRoomsByLocation(id);
  }
}
