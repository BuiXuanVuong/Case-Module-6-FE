import {IComment} from './icomment';
import {StatusReply} from './status-reply';
export interface IStatus {
  id: number;
  content: string;
  wallId: number;
  createdAt: Date;
  updatedAt: Date;
  images: any;
  imageURL: any;
  totalStatusReplyLike?: number;
  totalLikes?: number;
  repliedStatusMessages?: StatusReply[];


}
