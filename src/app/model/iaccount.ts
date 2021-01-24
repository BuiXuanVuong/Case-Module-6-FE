import {Role} from './role';

export interface IAccount {
  id?: number;
  email?: string;
  userName?: string;
  password?: string;
  phone?: number;
  image?: string;
  birthday?: string;
  image: string;

  enabled?: boolean;
  status?: number;

  avatarUrl: string;

  accessToken?: string;
}
