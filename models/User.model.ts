import { Schema, model } from 'mongoose';

import { GAME } from '../constants';

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

    game: {
      money: {
        type: Number,
        default: GAME.MONEY.INIT,
      },
    },
  },
  { timestamps: true },
);

const UserModel = model<UserDoc>('User', userSchema);

export default class UserClass extends UserModel {
  static async createUser(user: UserSignUpRequest): Promise<UserDoc> {
    try {
      const { username, email, password } = user;

      const createdDoc: UserDoc = await this.create({
        username,
        email,
        password,

        game: {
          money: GAME.MONEY.INIT,
        },
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateMoney(
    userId: UserDoc['_id'],
    money: UserDoc['game']['money'],
  ): Promise<UserDoc | null> {
    try {
      const updatedDoc: UserDoc | null = await this.findOneAndUpdate(
        { _id: userId },
        { 'game.money': money },
      );

      return updatedDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllUsers(): Promise<UserDoc[]> {
    try {
      const docs: UserDoc[] = await this.find({});

      return docs;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUser(user: UserLogInRequest): Promise<UserDoc | null> {
    try {
      const { login, password } = user;

      if (!login || !password) return null;

      const foundDoc: UserDoc | null = await this.findOne({
        $or: [{ email: login }, { username: login }],
      });

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserById(id: UserDoc['_id']): Promise<UserDoc | null> {
    try {
      const foundDoc: UserDoc | null = await this.findOne({ _id: id });

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteUserById(id: UserDoc['_id']): Promise<UserDoc | null> {
    try {
      const foundDoc: UserDoc | null = await this.findOneAndDelete({ _id: id });

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }
}
