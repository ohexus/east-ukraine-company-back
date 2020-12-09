import { Schema, model, Types } from 'mongoose';
import { LOGS } from '../constants';

import calcTimeByXp from '../helpers/calcTimeByXp';

import { LootingDoc, Looting } from '../interfaces/entities/Looting';
import { UnitDoc } from '../interfaces/entities/Unit';
import { UserDoc } from '../interfaces/entities/User';

const lootingSchema: Schema = new Schema<LootingDoc>(
  {
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },

    content: {
      topic: { type: String, required: true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
    },

    reward: {
      money: { type: Number, default: 500 },
      xp: { type: Number, default: 500 },
    },

    isStarted: { type: Boolean, default: false },

    units: { type: [{ type: Types.ObjectId, ref: 'Unit' }], default: [] },

    timer: {
      // ms
      left: { type: Number, required: true },
      total: { type: Number, required: true },
      status: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const LootingModel = model<LootingDoc>('looting', lootingSchema);

class LootingClass extends LootingModel {
  static async createLooting(
    looting: Looting,
    userId: UserDoc['_id'],
    unitIds: Array<UnitDoc['_id']>
  ): Promise<LootingDoc> {
    const { content, reward } = looting;

    const totalTimeToFinish = calcTimeByXp(reward.xp);

    try {
      const createdDoc = await this.create({
        createdBy: userId,
        content,
        reward,
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
      throw new Error(error.message);
    }
  }

  static async getLootingById(id: LootingDoc['_id']): Promise<LootingDoc> {
    try {
      const lootingDoc = await this.findOne({ _id: id });

      if (!lootingDoc) {
        throw new Error(LOGS.ERROR.LOOTING.NOT_FOUND);
      }

      return lootingDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async finishLooting(lootingId: LootingDoc['_id']): Promise<LootingDoc> {
    try {
      const lootingDoc = await this.getLootingById(lootingId);

      lootingDoc.isStarted = false;
      lootingDoc.timer = {
        total: lootingDoc.timer.total,
        left: lootingDoc.timer.left,
        status: false,
      };

      await lootingDoc.save();

      return lootingDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateTimeLeft(
    lootingId: LootingDoc['_id'],
    timeLeft: LootingDoc['timer']['left']
  ): Promise<LootingDoc> {
    try {
      const lootingDoc = await this.getLootingById(lootingId);

      lootingDoc.timer.left = timeLeft || 0;
      lootingDoc.timer.status = !!timeLeft;

      await lootingDoc.save();

      return lootingDoc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllLootingsByUser(userId: UserDoc['_id']): Promise<LootingDoc[]> {
    try {
      const lootingDocs = await this.find({ createdBy: userId });

      return lootingDocs;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllStartedLootings(userId: UserDoc['_id']): Promise<LootingDoc[]> {
    try {
      const lootingDocs = await this.find({
        createdBy: userId,
        isStarted: true,
      });

      return lootingDocs;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default LootingClass;
