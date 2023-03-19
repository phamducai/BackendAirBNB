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
import { Bookroom } from './dto/bookroom.dto';

@Controller('bookroom')
export class BookroomController {
  constructor(private bookRoomService: BookroomService) {}
  @Get('')
  getBookrooms(): Promise<Bookroom[]> {
    return this.bookRoomService.getAllBookRoom();
  }
  @Post('')
  postBookRooms(@Body() bookroomDTO: Bookroom): Promise<Bookroom> {
    return this.bookRoomService.postBookRoom(bookroomDTO);
  }
  @Get(':id')
  getBookRoomById(@Param('id', ParseIntPipe) id: number): Promise<Bookroom> {
    return this.bookRoomService.getBookRoombyid(id);
  }
  @Put(':id')
  updateComment(
    @Body() bookroomDTO: Bookroom,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Bookroom> {
    console.log(id);
    return this.bookRoomService.updateBookRoombyid(bookroomDTO, id);
  }

  @Delete(':id')
  deleteBookRoom(@Param('id', ParseIntPipe) id: number): Promise<Bookroom> {
    return this.bookRoomService.deleteBookRoom(id);
  }
}
