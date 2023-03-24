/* eslint-disable prettier/prettier */
export interface CommentsDTO {
  id: number;
  user_id: number;
  room_id: number;
  date_comment: Date;
  content: string;
  rate: number;
}
