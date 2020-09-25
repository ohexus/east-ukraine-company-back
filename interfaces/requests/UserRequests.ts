import { UserDoc } from "../entities/User";

export interface UserLogInRequest {
  login: UserDoc['email'] | UserDoc['username'];
  password: UserDoc['password'];
}

export interface UserSignUpRequest {
  username: UserDoc['username'];
  email: UserDoc['email'];
  password: UserDoc['password'];
}
