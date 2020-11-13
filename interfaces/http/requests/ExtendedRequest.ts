import { Request } from 'express';
import { UserDoc } from '../../entities/User';

export default interface ExtendedRequest extends Request {
  userId?: UserDoc['_id'];
}
