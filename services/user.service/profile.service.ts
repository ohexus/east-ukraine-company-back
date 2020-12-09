import { UserClass } from '../../models';

import { UserSignUpRequest, UserLogInRequest } from '../../interfaces/http/requests/UserRequests';
import { UserDoc } from '../../interfaces/entities/User';

class UserProfileService {
  async createUser(user: UserSignUpRequest): Promise<UserDoc> {
    return await UserClass.createUser(user);
  }

  async getAll(): Promise<UserDoc[]> {
    return await UserClass.getAll();
  }

  async getUserById(id: string): Promise<UserDoc> {
    return await UserClass.getUserById(id);
  }

  async deleteUserById(id: string): Promise<UserDoc> {
    return await UserClass.deleteUserById(id);
  }

  // async updateAvatar()
}

export default new UserProfileService();
