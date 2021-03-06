import {Role} from './role';

export interface IAccount {
  id?: number;
  email?: string;
  userName?: string;
  password?: string;
  phone?: number;
  image?: string;
  birthday?: string;
  avatarUrl: string;

  accessToken?: string;
  enabled?: boolean;
}
