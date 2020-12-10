import { Schema, model } from 'mongoose';

import { GAME, LOGS } from '../constants';

import { User, UserDoc } from '../interfaces/entities/User';
import { UserSignUpRequest, UserLogInRequest } from '../interfaces/http/requests/UserRequests';

const userSchema: Schema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    game: {
      money: { type: Number, default: GAME.MONEY.INIT },
      xp: {
        level: { type: Number, default: GAME.XP.LEVELS[0] },
        total: { type: Number, default: 0 },
      },
    },
  },
  { timestamps: true }
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
          xp: {
            level: GAME.XP.LEVELS[0],
            total: 0,
          },
        },
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAll(): Promise<UserDoc[]> {
    try {
      const docs: UserDoc[] = await this.find({});

      return docs;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getByLogin(login: UserLogInRequest['login']): Promise<UserDoc> {
    try {
      const userDoc: UserDoc | null = await this.findOne({
        $or: [{ email: login }, { username: login }],
      });
      if (!userDoc) {
        throw new Error(LOGS.ERROR.USER.NOT_FOUND);
      }

      return userDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getUserById(id: UserDoc['_id']): Promise<UserDoc> {
    try {
      const userDoc: UserDoc | null = await this.findOne({ _id: id });
      if (!userDoc) {
        throw new Error(LOGS.ERROR.USER.NOT_FOUND);
      }

      return userDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteUserById(id: UserDoc['_id']): Promise<UserDoc> {
    try {
      const userDoc: UserDoc | null = await this.findOneAndDelete({ _id: id });
      if (!userDoc) {
        throw new Error(LOGS.ERROR.USER.NOT_FOUND);
      }

      return userDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async decreaseMoney(
    userId: UserDoc['_id'],
    amount: UserDoc['game']['money']
  ): Promise<UserDoc['game']['money']> {
    try {
      const userDoc = await this.getUserById(userId);

      const userMoney: UserDoc['game']['money'] = await this.updateOne(
        userDoc,
        { 'game.money': userDoc.game.money - amount },
        { new: true }
      ).then((doc) => doc.game.money);

      return userMoney;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getMoney(userId: UserDoc['_id']): Promise<User['game']['money']> {
    try {
      const userMoney: UserDoc['game']['money'] = await this.getUserById(userId).then((doc) => doc.game.money);

      return userMoney;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async increaseMoney(
    userId: UserDoc['_id'],
    amount: UserDoc['game']['money']
  ): Promise<UserDoc['game']['money']> {
    try {
      const userDoc = await this.getUserById(userId);

      const userMoney: UserDoc['game']['money'] = await this.updateOne(
        userDoc,
        { $inc: { 'game.money': amount } },
        { new: true }
      ).then((doc) => doc.game.money);

      return userMoney;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async setMoney(userId: UserDoc['_id'], amount: UserDoc['game']['money']): Promise<UserDoc['game']['money']> {
    try {
      const userDoc = await this.getUserById(userId);

      const userMoney: UserDoc['game']['money'] = await this.updateOne(
        userDoc,
        { 'game.money': amount },
        { new: true }
      ).then((doc) => doc.game.money);

      return userMoney;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
