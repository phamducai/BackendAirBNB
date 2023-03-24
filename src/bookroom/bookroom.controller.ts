import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BookroomService } from './bookroom.service';
import { Booking } from './dto/bookroom.dto';

@Controller('bookroom')
export class BookroomController {
  constructor(private bookRoomService: BookroomService) {}
  @Get('')
  getBookrooms(): Promise<Booking[]> {
    return this.bookRoomService.getAllBookRoom();
  }
  @Post('')
  postBookRooms(@Body() bookroomDTO: Booking): Promise<Booking> {
    return this.bookRoomService.postBookRoom(bookroomDTO);
  }
  @Get(':id')
  getBookRoomById(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookRoomService.getBookRoombyid(id);
  }
  @Put(':id')
  updateComment(
    @Body() bookroomDTO: Booking,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Booking> {
    console.log(id);
    return this.bookRoomService.updateBookRoombyid(bookroomDTO, id);
  }

  @Delete(':id')
  deleteBookRoom(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookRoomService.deleteBookRoom(id);
  }
}
