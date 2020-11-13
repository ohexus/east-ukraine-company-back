import { Schema, model, Types } from 'mongoose';

import { UNITS } from '../constants';

import genUnit from '../helpers/units/genUnit';
import getNextRank from '../helpers/units/ranks/getNextRank';

import { LootingDoc } from '../interfaces/entities/Looting';
import { UnitDoc } from '../interfaces/entities/Unit';
import { UserDoc } from '../interfaces/entities/User';

import { UnitRankKeys } from '../interfaces/units/UnitRank';
import { UnitXp } from '../interfaces/units/UnitXp';

const unitSchema = new Schema(
  {
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },

    name: { type: String, required: true },
    gender: { type: String, required: true },

    pathToAvatar: { type: String, required: true },

    rank: { type: String, required: true },
    salary: { type: Number, required: true },

    xp: {
      current: { type: Number, default: 0, required: true },
      promotion: {
        type: Number,
        default: UNITS.XP_PROMOTION.BARQUE,
        required: true,
      },
    },

    lootingId: {
      type: Types.ObjectId || null,
      ref: 'UserLooting',
      default: null,
    },
  },
  { timestamps: true }
);

const UnitModel = model<UnitDoc>('Unit', unitSchema);

export default class UnitClass extends UnitModel {
  static async createUnit(rank: UnitRankKeys | undefined, userId: UserDoc['_id']): Promise<UnitDoc> {
    const newUnit = genUnit(rank, userId);

    const createdDoc = await this.create(newUnit);

    return createdDoc;
  }

  static async promoteUnitById(id: UnitDoc['_id']): Promise<UnitDoc | null> {
    const unitDoc = await this.findOne({ _id: id });

    if (!unitDoc) return null;

    const nextRank: UnitRankKeys = getNextRank(unitDoc.rank);

    const newXp: UnitXp = {
      current: unitDoc.xp.current,
      promotion: UNITS.XP_PROMOTION[nextRank],
    };

    const updatedDoc =
      nextRank !== unitDoc.rank
        ? await this.findOneAndUpdate({ _id: id }, { rank: nextRank, xp: newXp }, { new: true })
        : unitDoc;

    return updatedDoc;
  }

  static async assignLootingToUnits(lootingId: LootingDoc['_id'], unitIds: Array<UnitDoc['_id']>): Promise<UnitDoc[]> {
    await this.updateMany({ _id: { $in: unitIds } }, { lootingId });

    const unitDocs = await this.find({ _id: { $in: unitIds } });

    return unitDocs;
  }

  static async finishLootingForUnits(unitIds: Array<UnitDoc['_id']>, xpGain: LootingDoc['xpGain']): Promise<UnitDoc[]> {
    await this.updateMany({ _id: { $in: unitIds } }, { lootingId: null, $inc: { 'xp.current': xpGain } });

    const unitDocs = await this.find({ _id: { $in: unitIds } });

    return unitDocs;
  }

  static async getUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc | null> {
    const unitDoc = await this.findOne({ _id: unitId });

    return unitDoc;
  }

  static async getAllUserUnits(userId: UserDoc['_id']): Promise<UnitDoc[]> {
    const unitDocs = await this.find({ createdBy: userId });

    return unitDocs;
  }

  static async getAllUnits() {
    const unitDocs = await this.find({});

    return unitDocs;
  }

  static async deleteUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc | null> {
    const deletedUnit = await this.findByIdAndDelete(unitId);

    return deletedUnit;
  }

  static async deleteUnitsDB(): Promise<number | undefined> {
    const { deletedCount } = await this.deleteMany({});

    return deletedCount;
  }
}
