import { UserClass } from '../../models';

import { UserLogInRequest, UserSignUpRequest } from '../../interfaces/http/requests/UserRequests';
import { UserDoc } from '../../interfaces/entities/User';
import { comparePasswords, createToken, hashPassword } from '../../utils';
import { LOGS } from '../../constants';

class AuthService {
  async signUp({ email, username, password }: UserSignUpRequest): Promise<string> {
    const hashedPass = await hashPassword(password);

    const user: UserDoc = await UserClass.createUser({ email, username, password: hashedPass });

    return createToken(user._id);
  }

  async logIn(userReq: UserLogInRequest): Promise<string> {
    const user: UserDoc = await UserClass.getByLogin(userReq.login);

    const compareResult = await comparePasswords(userReq.password, user.password);
    if (!compareResult) {
      throw new Error(LOGS.ERROR.PASSWORD.INVALID);
    }

    return createToken(user._id);
  }
}

export default new AuthService();
