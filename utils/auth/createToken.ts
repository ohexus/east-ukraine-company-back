import jwt from 'jsonwebtoken';
import config from 'config';

const secret: string = config.get('JWT_SECRET');

export default function createToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || secret, {
    expiresIn: '1d',
  });
}
