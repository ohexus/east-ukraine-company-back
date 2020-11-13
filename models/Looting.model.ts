import { Schema, model, Types } from 'mongoose';

import calcTimeByXp from '../helpers/calcTimeByXp';

import { LootingDoc, Looting } from '../interfaces/entities/Looting';
import { UnitDoc } from '../interfaces/entities/Unit';
import { UserDoc } from '../interfaces/entities/User';

const lootingSchema: Schema = new Schema<LootingDoc>({
  createdBy: { type: Types.ObjectId, ref: 'User', required: true },

  title: { type: String, required: true },
  desc: { type: String, required: true },

  topic: { type: String, required: true },

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

const LootingModel = model<LootingDoc>('looting', lootingSchema);

class LootingClass extends LootingModel {
  static async createLooting(
    looting: Looting,
    userId: UserDoc['_id'],
    unitIds: Array<UnitDoc['_id']>
  ): Promise<LootingDoc> {
    const { title, desc, topic, xpGain } = looting;

    const totalTimeToFinish = calcTimeByXp(xpGain);

    try {
      const createdDoc = await this.create({
        createdBy: userId,
        title,
        desc,
        topic,
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

  static async finishLooting(lootingId: LootingDoc['_id']): Promise<LootingDoc | null> {
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
    lootingId: LootingDoc['_id'],
    timeLeft: LootingDoc['timer']['left']
  ): Promise<LootingDoc | null> {
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

  static async getAllLootingsByUser(userId: UserDoc['_id']): Promise<LootingDoc[]> {
    try {
      const foundDocs = await this.find({ createdBy: userId });

      return foundDocs;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAllStartedLootings(userId: UserDoc['_id']): Promise<LootingDoc[]> {
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

  static async getLootingById(id: LootingDoc['_id']): Promise<LootingDoc | null> {
    try {
      const foundDoc = await this.findOne({ _id: id });

      return foundDoc;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default LootingClass;
