import { Delete, Put } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
} from '@nestjs/common';
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
  getRoomsbylocation(@Query('id', ParseIntPipe) id: number) {
    // logic to get users with pagination
    return this.roomService.getRoomsByLocation(id);
  }
  @Get(':id')
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    // logic to get users with pagination
    return this.roomService.getroomById(id);
  }
  @Post('')
  postRoom(@Body() room: RoomDTO) {
    delete room?.id;
    return this.roomService.postRoom(room);
  }
  @Put(':id')
  putRoom(@Body() room: RoomDTO, @Param('id', ParseIntPipe) id: number) {
    delete room?.id;
    return this.roomService.updateRoom(id, room);
  }
  @Get('pagination')
  getPagination(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
  ) {
    // logic to get users with pagination
    return this.roomService.getPhanTrangTimKiem(limit, page, search);
  }
  @Delete(':id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.deleteRoom(id);
  }
}
