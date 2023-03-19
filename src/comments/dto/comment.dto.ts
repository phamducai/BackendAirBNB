/* eslint-disable prettier/prettier */
export interface CommentsDTO {
  id: number;
  user_id: number;
  room_id: number;
  comment_date: string;
  content: string;
  rate: number;
}
