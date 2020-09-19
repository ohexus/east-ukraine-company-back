import { Schema, model, Types } from 'mongoose';

import calcTimeByXp from '../../helpers/calcTimeByXp';

import { UserLootingDoc, Looting } from '../../interfaces/entities/Looting';

const userLootingSchema: Schema = new Schema<UserLootingDoc>({
  createdBy: { type: Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  description: { type: String, required: true },

  xpGain: { type: Number, default: 500 },

  isStarted: { type: Boolean, default: false },

  units: { type: [{ type: Types.ObjectId, ref: 'Unit' }], default: [] },

  timer: {
    // ms
    left: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: Boolean, default: false },
  },
});

const UserLootingModel = model<UserLootingDoc>(
  'UserLooting',
  userLootingSchema,
);

class UserLootingClass extends UserLootingModel {
  static async createUserLooting(
    looting: Looting,
    userId: string,
    unitIds: string[],
  ): Promise<UserLootingDoc> {
    const { title, description, xpGain } = looting;

    const totalTimeToFinish = calcTimeByXp(xpGain);

    try {
      const createdDoc = await this.create({
        createdBy: userId,
        title,
        description,
        xpGain,
        isStarted: true,
        units: unitIds,
        timer: {
          total: totalTimeToFinish,
          left: totalTimeToFinish,
          status: true,
        },
      });

      return createdDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async finishUserLooting(
    lootingId: string,
  ): Promise<UserLootingDoc | null> {
    try {
      const foundDoc = await this.findById(lootingId);

      if (!foundDoc) return null;

      foundDoc.isStarted = false;
      foundDoc.timer = {
        total: foundDoc.timer.total,
        left: foundDoc.timer.left,
        status: false,
      };

      await foundDoc.save();

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateTimeLeft(
    lootingId: string,
    timeLeft: number,
  ): Promise<UserLootingDoc | null> {
    try {
      const foundDoc = await this.findById(lootingId);

      if (!foundDoc) return null;

      foundDoc.timer.left = timeLeft || 0;
      foundDoc.timer.status = !!timeLeft;

      await foundDoc.save();

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllUserLootings(userId: string): Promise<UserLootingDoc[]> {
    try {
      const foundDocs = await this.find({ createdBy: userId });

      return foundDocs;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllStartedUserLootings(
    userId: string,
  ): Promise<UserLootingDoc[]> {
    try {
      const foundDocs = await this.find({
        createdBy: userId,
        isStarted: true,
      });

      return foundDocs;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserLootingById(id: string): Promise<UserLootingDoc | null> {
    try {
      const foundDoc = await this.findOne({ _id: id });

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UserLootingClass;
