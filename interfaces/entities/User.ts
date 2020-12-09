import { Document } from 'mongoose';

export interface User {
  email: string;
  username: string;
  password: string;

  game: {
    money: number;
    xp: {
      level: number;
      rank?: string;
      total: number;
    };
  };
}

export interface UserDoc extends User, Document {}
