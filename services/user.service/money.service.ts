import { UserClass } from '../../models';

import { User, UserDoc } from '../../interfaces/entities/User';
import { LOGS } from '../../constants';

class UserMoneyService {
  async decreaseMoney(userId: UserDoc['_id'], amount: UserDoc['game']['money']): Promise<UserDoc['game']['money']> {
    return await UserClass.decreaseMoney(userId, amount);
  }

  async getMoney(userId: UserDoc['_id']): Promise<User['game']['money']> {
    return await UserClass.getMoney(userId);
  }

  async increaseMoney(userId: UserDoc['_id'], amount: UserDoc['game']['money']): Promise<UserDoc['game']['money']> {
    return await UserClass.increaseMoney(userId, amount);
  }

  async setMoney(userId: UserDoc['_id'], amount: UserDoc['game']['money']): Promise<UserDoc['game']['money']> {
    return await UserClass.setMoney(userId, amount);
  }

  async checkThenDecreaseMoney(
    userId: UserDoc['_id'],
    amount: UserDoc['game']['money']
  ): Promise<UserDoc['game']['money']> {
    const userMoney = await this.getMoney(userId);
    if (userMoney - amount < 0) {
      throw new Error(LOGS.ERROR.MONEY.NOT_ENOUGH);
    }

    return await this.decreaseMoney(userId, amount);
  }
}

export default new UserMoneyService();
