import {Iuser} from './iuser';

export interface StatusReply {
  id: number;
  statusReplyBody: string;
  userReply: string;
  createDate: Date;
  status: any;
  totalStatusReplyLike?: number;

}
