import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bookroom } from './dto/bookroom.dto';

@Injectable()
export class BookroomService {
  constructor(private prismaService: PrismaService) {}
  async getAllBookRoom(): Promise<Bookroom[]> {
    // Async function that returns all stored comments in Response DTO.
    console.log('huhu');
    try {
      const getAllComment = await this.prismaService.bookroom.findMany(); // obtain all comments from database using the injected PrismaService instance.
      return getAllComment; // when a list is obtained, it's returned as a response.
    } catch (error) {
      throw new BadRequestException(); // In case of any error, a HTTP 400 Bad Request Exception is thrown.
    }
  }

  async postBookRoom(bookroomDTO: Bookroom): Promise<Bookroom> {
    // Async function for posting a comment, takes the CommentDTO instance as an input and returns newly created comment DTO object.
    try {
      const createBookRoom = await this.prismaService.bookroom.create({
        // Create a new comment instance with data received in commentDTO.
        data: {
          room_id: bookroomDTO.room_id,
          start_day: new Date(bookroomDTO.start_day),
          end_day: new Date(bookroomDTO.end_day),
          guest_number: bookroomDTO.guest_number,
          user_id: bookroomDTO.user_id,
        },
      });
      return createBookRoom;
    } catch (error) {
      const { code } = error;
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name);
      }
      throw new BadRequestException();
    }
  }

  async getBookRoombyid(id: number): Promise<Bookroom> {
    // Async function for updating an existing comment, takes commentDTO as an input and comment id as the parameters, returns updated comment DTO.
    try {
      const bookroom = await this.prismaService.bookroom.findUnique({
        where: {
          id: id,
        },
      });
      return bookroom; // Returns updated comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error;
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name);
      }
      throw new BadRequestException();
    }
  }

  async updateBookRoombyid(
    bookroomDTO: Bookroom,
    id: number,
  ): Promise<Bookroom> {
    // Async function for updating an existing comment, takes commentDTO as an input and comment id as the parameters, returns updated comment DTO.
    try {
      const updatebookroom = await this.prismaService.bookroom.update({
        where: {
          id: id,
        },
        data: {
          room_id: bookroomDTO.room_id,
          start_day: new Date(bookroomDTO.start_day),
          end_day: new Date(bookroomDTO.end_day),
          guest_number: bookroomDTO.guest_number,
          user_id: bookroomDTO.user_id,
        },
      });
      return updatebookroom; // Returns updated comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error;
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name);
      }
      throw new BadRequestException();
    }
  }

  async deleteBookRoom(id: number): Promise<Bookroom> {
    // Async function for deleting a comment, takes id as a parameter and returns deleted comment's DTO object.
    try {
      const deletebookroom = await this.prismaService.bookroom.delete({
        where: {
          id: id, // Deletes the comment entry identified by this ID.
        },
      });
      return deletebookroom;
    } catch (error) {
      const { code } = error;
      if (code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException();
    }
  }

  async getBookRoombyUserId(id: number): Promise<Bookroom[]> {
    try {
      const getbookroombyuserid = await this.prismaService.bookroom.findMany({
        where: { user_id: id },
      });
      return getbookroombyuserid;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
