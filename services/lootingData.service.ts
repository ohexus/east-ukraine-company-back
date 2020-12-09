import { dataAPI } from '../utils';

import BackServerResponse from '../interfaces/http/responses/BackServerResponse';
import { LootingDoc, Looting } from '../interfaces/entities/Looting';
import { LOGS } from '../constants';

class LootingDataService {
  async getAllLootings(): Promise<Looting[]> {
    const resData: BackServerResponse<Looting[]> = await dataAPI.get('looting/all').then((res) => {
      return res.data;
    });

    if (!resData.success) {
      throw new Error(LOGS.ERROR.LOOTING_DATA.GET_MANY);
    }

    return resData.payload;
  }

  async getLootingById(id: LootingDoc['_id']): Promise<Looting> {
    const resData: BackServerResponse<Looting> = await dataAPI.get(`looting/${id}`).then((res) => {
      return res.data;
    });

    if (!resData.success) {
      throw new Error(LOGS.ERROR.LOOTING_DATA.GET_ONE);
    }

    return resData.payload;
  }
}

export default new LootingDataService();
