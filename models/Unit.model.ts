import { Schema, model, Types } from 'mongoose';

import { LOGS, UNITS } from '../constants';

import genUnit from '../helpers/units/genUnit';
import getNextRank from '../helpers/units/ranks/getNextRank';

import { LootingDoc } from '../interfaces/entities/Looting';
import { Unit, UnitDoc } from '../interfaces/entities/Unit';
import { UserDoc } from '../interfaces/entities/User';

const unitSchema = new Schema(
  {
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },

    bio: {
      name: { type: String, required: true },
      gender: { type: String, required: true },

      pathToAvatar: { type: String, required: true },
    },

    rank: { type: String, required: true },
    salary: { type: Number, required: true },

    xp: {
      current: { type: Number, default: 0, required: true },
      promotion: {
        type: Number,
        default: UNITS.PROMOTION.XP.BARQUE,
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
  static async createUnit(rank: Unit['rank'] | undefined, userId: UserDoc['_id']): Promise<UnitDoc> {
    const createdDoc = await this.create(genUnit(rank, userId));

    return createdDoc;
  }

  static async getUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc> {
    const unitDoc = await this.findOne({ _id: unitId });
    if (!unitDoc) {
      throw new Error(LOGS.ERROR.UNIT.NOT_FOUND);
    }

    return unitDoc;
  }

  static async promoteUnitById(id: UnitDoc['_id']): Promise<UnitDoc> {
    const unitDoc = await this.getUnitById(id);

    const nextRank: Unit['rank'] = getNextRank(unitDoc.rank);

    const newXp: Unit['xp'] = {
      current: unitDoc.xp.current,
      promotion: UNITS.PROMOTION.XP[nextRank],
    };

    const updatedDoc =
      nextRank !== unitDoc.rank
        ? await this.findOneAndUpdate({ _id: id }, { rank: nextRank, xp: newXp }, { new: true })
        : unitDoc;

    if (!updatedDoc) {
      throw new Error(LOGS.ERROR.UNIT.PROMOTE);
    }

    return updatedDoc;
  }

  static async assignLooting(lootingId: LootingDoc['_id'], unitIds: Array<UnitDoc['_id']>): Promise<UnitDoc[]> {
    await this.updateMany({ _id: { $in: unitIds } }, { lootingId });

    const unitDocs = await this.find({ _id: { $in: unitIds } });

    return unitDocs;
  }

  static async finishLooting(
    unitIds: Array<UnitDoc['_id']>,
    xpGain: LootingDoc['reward']['xp']
  ): Promise<UnitDoc[]> {
    await this.updateMany({ _id: { $in: unitIds } }, { lootingId: null, $inc: { 'xp.current': xpGain } });

    const unitDocs = await this.find({ _id: { $in: unitIds } });
    if (!unitDocs.length) {
      throw new Error(LOGS.ERROR.UNIT.FINISH_LOOTING);
    }

    return unitDocs;
  }

  static async getAllUserUnits(userId: UserDoc['_id']): Promise<UnitDoc[]> {
    const unitDocs = await this.find({ createdBy: userId });

    return unitDocs;
  }

  static async getAllUnits() {
    const unitDocs = await this.find({});

    return unitDocs;
  }

  static async deleteUnitById(unitId: UnitDoc['_id']): Promise<UnitDoc> {
    const deletedUnitDoc = await this.findByIdAndDelete(unitId);

    if (!deletedUnitDoc) {
      throw new Error(LOGS.ERROR.UNIT.DELETE);
    }

    return deletedUnitDoc;
  }

  static async deleteUnitsDB(): Promise<number | undefined> {
    const { deletedCount } = await this.deleteMany({});

    return deletedCount;
  }
}
