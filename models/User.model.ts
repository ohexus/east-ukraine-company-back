import { Schema, model } from 'mongoose';

import { IUserDoc } from '../interfaces/entities/IUser';
import {
  UserSignUpRequest,
  UserLogInRequest,
} from '../interfaces/requests/UserRequests';

// logs: [
//   {
//     message: String,
//     time: { type: Date, default: Date.now() },
//   },
// ],

// $push: {
//   logs: {
//     message: 'User created',
//     time: Date.now(),
//   },
// },

const userSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = model<IUserDoc>('User', userSchema);

export default class User extends UserModel {
  static async createUser(user: UserSignUpRequest): Promise<IUserDoc | null> {
    try {
      const { username, email, password } = user;

      const createdDoc: IUserDoc = await this.create({
        username,
        email,
        password,
      });

      return createdDoc;
    } catch {
      return null;
    }
  }

  static async getAllUsers(): Promise<IUserDoc[]> {
    const docs: IUserDoc[] = await this.find({});

    return docs;
  }

  static async getUser(user: UserLogInRequest): Promise<IUserDoc | null> {
    try {
      const { login, password } = user;

      const all = await this.find({});

      console.log(all);

      if (!login || !password) return null;

      const foundDoc: IUserDoc | null = await this.findOne({
        $or: [{ email: login }, { username: login }],
      });

      return foundDoc;
    } catch {
      return null;
    }
  }

  static async getUserById(id: string): Promise<IUserDoc | null> {
    try {
      if (!id) return null;

      const foundDoc: IUserDoc | null = await this.findOne({ _id: id });

      return foundDoc;
    } catch {
      return null;
    }
  }
}
