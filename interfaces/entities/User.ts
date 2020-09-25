import { Document } from 'mongoose';

export interface User {
  email: string;
  username: string;
  password: string;

  game: {
    money: number;
  };
}

export interface UserDoc extends User, Document {}
