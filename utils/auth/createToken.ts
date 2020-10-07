import jwt from 'jsonwebtoken';
import config from 'config';

const secret: string = process.env.JWT_SECRET || config.get('JWT_SECRET');

export default function createToken(userId: string): string {
  return jwt.sign({ userId }, secret, {
    expiresIn: '2 days',
  });
}
