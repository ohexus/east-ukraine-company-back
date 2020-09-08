import { Schema, model } from 'mongoose';

import getRandomInt from '../../helpers/getRandomInt';

import { LootingDataCreateRequest } from '../../interfaces/requests/LootingRequests';
import { LootingDataDoc } from '../../interfaces/entities/Looting';

const lootingDataSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },

  xpGain: { type: Number, default: 500 },
});

const LootingDataModel = model<LootingDataDoc>(
  'LootingData',
  lootingDataSchema,
);

class LootingDataClass extends LootingDataModel {
  static async createLooting(
    looting: LootingDataCreateRequest,
  ): Promise<LootingDataDoc | null> {
    try {
      const { title, description, xpGain } = looting;

      if (!title || !description) return null;

      const createdDoc = await this.create({
        title,
        description,
        xpGain: xpGain || 1000,
      });

      return createdDoc;
    } catch {
      return null;
    }
  }

  static async getAllLootings(): Promise<LootingDataDoc[]> {
    try {
      const foundDocs = await this.find({});

      return foundDocs;
    } catch {
      return [];
    }
  }

  static async getLootingById(id: string): Promise<LootingDataDoc | null> {
    try {
      if (!id) return null;

      const foundDoc = await this.findOne({ _id: id });

      if (!foundDoc) return null;

      return foundDoc;
    } catch {
      return null;
    }
  }

  static async getRandomLooting(): Promise<LootingDataDoc | null> {
    try {
      const foundDocs = await this.find({});

      if (!foundDocs) return null;

      const randomIndex = getRandomInt(foundDocs.length);

      return foundDocs[randomIndex];
    } catch {
      return null;
    }
  }
}

export default LootingDataClass;
