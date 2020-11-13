import dataAPI from '../utils/dataAPI';

import BackServerResponse from '../interfaces/http/responses/BackServerResponse';

import { LootingDoc, Looting } from '../interfaces/entities/Looting';

class LootingsDataService {
  async getAllLootings(): Promise<Looting[] | null> {
    const resData: BackServerResponse<Looting[]> = await dataAPI.get('looting/all').then((res) => {
      return res.data;
    });

    if (!resData.success) {
      return null;
    }

    return resData.payload;
  }

  async getLootingById(id: LootingDoc['_id']): Promise<Looting | null> {
    const resData: BackServerResponse<Looting> = await dataAPI.get(`looting/${id}`).then((res) => {
      return res.data;
    });

    console.log(resData);

    if (!resData.success) {
      return null;
    }

    return resData.payload;
  }
}

export default new LootingsDataService();
