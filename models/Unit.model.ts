import { Schema, model, Types } from 'mongoose';

import { UnitDoc } from '../interfaces/entities/Unit';
import { UnitRankKeys } from '../interfaces/units/UnitRank';
import genUnit from '../helpers/units/genUnit';

const unitSchema = new Schema(
  {
    created_by: { type: Types.ObjectId, ref: 'User', required: true },

    name: { type: String, required: true },
    gender: { type: String, required: true },

    avatarBuffer: {
      type: { data: Buffer, contentType: String },
      required: true,
    },

    rank: { type: String, required: true },
    salary: { type: Number, required: true },

    xp: {
      current: { type: Number, required: true },
      promotion: { type: Number, required: true },
    },

    lootingId: { type: String, default: null },
  },
  { timestamps: true },
);

const UnitModel = model<UnitDoc>('Unit', unitSchema);

export default class UnitClass extends UnitModel {
  static async createUnit(
    rank: UnitRankKeys | undefined,
    userId: string,
  ): Promise<UnitDoc> {
    const newUnit = genUnit(rank, userId);

    const createdDoc = await this.create(newUnit);

    return createdDoc;
  }

  static async getAllUnitsByUser(userId: string): Promise<UnitDoc[]> {
    return await this.find({ created_by: userId });
  }

  static async getAllUnits() {
    const docs = await this.find({});

    return docs;
  }
}
