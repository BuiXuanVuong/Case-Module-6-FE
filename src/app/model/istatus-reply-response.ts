import {StatusReply} from './status-reply';

export interface IStatusReplyResponse {
  isLike: boolean;
  status_reply: StatusReply[];
}
