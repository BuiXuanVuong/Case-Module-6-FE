import {Iuser} from './iuser';
import {IAccount} from './iaccount';

export interface StatusReply {
  id: number;
  statusReplyBody: string;
  userReply: string;
  createDate: Date;
  status: any;
  totalStatusReplyLike?: number;
  totalLikes?: number;

  imageReply: string;
  user?: IAccount;
}
