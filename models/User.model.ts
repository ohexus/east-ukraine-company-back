import { Schema, model } from 'mongoose';

import { UserDoc } from '../interfaces/entities/User';
import {
  UserSignUpRequest,
  UserLogInRequest,
} from '../interfaces/requests/UserRequests';

const userSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = model<UserDoc>('User', userSchema);

export default class UserClass extends UserModel {
  static async createUser(user: UserSignUpRequest): Promise<UserDoc | null> {
    try {
      const { username, email, password } = user;

      const createdDoc: UserDoc = await this.create({
        username,
        email,
        password,
      });

      return createdDoc;
    } catch {
      return null;
    }
  }

  static async getAllUsers(): Promise<UserDoc[]> {
    const docs: UserDoc[] = await this.find({});

    return docs;
  }

  static async getUser(user: UserLogInRequest): Promise<UserDoc | null> {
    try {
      const { login, password } = user;

      const all = await this.find({});

      console.log(all);

      if (!login || !password) return null;

      const foundDoc: UserDoc | null = await this.findOne({
        $or: [{ email: login }, { username: login }],
      });

      return foundDoc;
    } catch {
      return null;
    }
  }

  static async getUserById(id: string): Promise<UserDoc | null> {
    try {
      if (!id) return null;

      const foundDoc: UserDoc | null = await this.findOne({ _id: id });

      return foundDoc;
    } catch {
      return null;
    }
  }
}
