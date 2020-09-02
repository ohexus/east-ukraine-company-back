import { Schema, model, Model } from 'mongoose';

import getRandomInt from '../helpers/getRandomInt';

import { LootingCreateRequest } from '../interfaces/requests/LootingRequests';
import { LootingDoc } from '../interfaces/entities/Looting';

const lootingSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },

  description: { type: String, required: true },

  xpGain: { type: Number, default: 500 },
});

const LootingModel = model<LootingDoc>('Looting', lootingSchema);

class LootingClass extends LootingModel {
  static async createLooting(
    looting: LootingCreateRequest,
  ): Promise<LootingDoc | null> {
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

  static async getAllLootings(): Promise<LootingDoc[]> {
    try {
      const foundDocs = await this.find({});

      return foundDocs;
    } catch {
      return [];
    }
  }

  static async getLootingById(id: string): Promise<LootingDoc | null> {
    try {
      if (!id) return null;

      const foundDoc = await this.findOne({ _id: id });

      if (!foundDoc) return null;

      return foundDoc;
    } catch {
      return null;
    }
  }

  static async getRandomLooting(): Promise<LootingDoc | null> {
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

export default LootingClass;
