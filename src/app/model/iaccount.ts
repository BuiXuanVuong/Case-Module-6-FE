import {Role} from './role';

export interface IAccount {
  id?: number;
  email?: string;
  userName?: string;
  password?: string;
  phone?: number;
  birthday?: string;
  image: string;

  enabled?: boolean;

  isNonBanned?: boolean;

  status?: number;

  avatarUrl: string;

  accessToken?: string;

}
