/* eslint-disable prettier/prettier */

// Importing necessary modules
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // import prisma service to communicate with the database
import { CommentsDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {} // Injects the PrismaService to the constructor of CommentsService.

  async getAllComment(): Promise<CommentsDTO[]> {
    // Async function that returns all stored comments in Response DTO.
    try {
      const getAllComment = await this.prismaService.comments.findMany(); // obtain all comments from database using the injected PrismaService instance.
      return getAllComment; // when a list is obtained, it's returned as a response.
    } catch (error) {
      throw new BadRequestException(); // In case of any error, a HTTP 400 Bad Request Exception is thrown.
    }
  }

  async postComments(commentDTO: CommentsDTO): Promise<CommentsDTO> {
    // Async function for posting a comment, takes the CommentDTO instance as an input and returns newly created comment DTO object.
    console.log(commentDTO); // Log the commentDTO object in the backend console.

    try {
      const createComment = await this.prismaService.comments.create({
        // Create a new comment instance with data received in commentDTO.
        data: {
          user_id: commentDTO?.user_id,
          room_id: commentDTO.room_id,
          comment_date: commentDTO.comment_date,
          content: commentDTO.content,
          rate: commentDTO.rate,
        },
      });
      return createComment; // Return the created comment as a response.
    } catch (error) {
      const { code } = error;
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name); // If the data being received by Prisma has some invalid field, a not found exception is thrown with the message included.
      }
      throw new BadRequestException(); // Otherwise, a BAD REQUEST error would be thrown
    }
  }

  async updateCommentbyuser(
    commentDTO: CommentsDTO,
    id: number,
  ): Promise<CommentsDTO> {
    // Async function for updating an existing comment, takes commentDTO as an input and comment id as the parameters, returns updated comment DTO.
    console.log(commentDTO, id);

    try {
      const updatecomment = await this.prismaService.comments.update({
        where: {
          id: id, // Finds the existing comment through its unique ID.
        },
        data: {
          user_id: commentDTO.user_id,
          room_id: commentDTO.room_id,
          comment_date: commentDTO.comment_date,
          content: commentDTO.content,
          rate: commentDTO.rate,
        },
      });
      return updatecomment; // Returns updated comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error;
      if (code === 'P2003') {
        throw new NotFoundException('Not Found ' + error.meta.field_name);
      }
      throw new BadRequestException();
    }
  }

  async deleteComment(id: number): Promise<CommentsDTO> {
    // Async function for deleting a comment, takes id as a parameter and returns deleted comment's DTO object.
    try {
      const deletecomment = await this.prismaService.comments.delete({
        where: {
          id: id, // Deletes the comment entry identified by this ID.
        },
      });
      return deletecomment; // Returns the deleted comment DTO storage operation was successful.
    } catch (error) {
      const { code } = error;
      if (code === 'P2025') {
        // thrown if comment to be deleted does not exist.
        throw new NotFoundException(error.meta.cause);
      }
      throw new BadRequestException();
    }
  }

  async getCommentsbyroomid(roomid: number): Promise<CommentsDTO[]> {
    try {
      const getcommentbyroom = await this.prismaService.comments.findMany({
        where: { room_id: roomid },
      });
      return getcommentbyroom; // Returns all comments associated with a specific room ID
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
