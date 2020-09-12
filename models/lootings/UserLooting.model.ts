import { Schema, model, Types } from 'mongoose';

import { UserLootingDoc, Looting } from '../../interfaces/entities/Looting';

const userLootingSchema: Schema = new Schema<UserLootingDoc>({
  createdBy: { type: Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  description: { type: String, required: true},

  xpGain: { type: Number, default: 500 },

  isStarted: { type: Boolean, default: false },

  units: { type: [{ type: Types.ObjectId, ref: 'Unit' }], default: [] },
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

    try {
      const createdDoc = await this.create({
        createdBy: userId,
        title,
        description,
        xpGain,
        isStarted: true,
        units: unitIds,
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
      const foundDoc = await this.findByIdAndUpdate(lootingId, {
        isStarted: false,
      });

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
