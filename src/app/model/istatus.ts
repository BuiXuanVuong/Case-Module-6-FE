import {IComment} from './icomment';
export interface IStatus {
  id: number;
  content: string;
  wallId: number;
  createdAt: Date;
  updatedAt: Date;
  images: any;
  totalComments?: number;
  totalLikes?: number;
  comments?: IComment[];
}
