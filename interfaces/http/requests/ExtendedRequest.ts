import { Request } from 'express';
import { UserDoc } from '../../entities/User';

export interface ExtendedRequest extends Request {
  userId: UserDoc['_id'];
}
