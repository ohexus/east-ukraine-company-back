import bcrypt from 'bcrypt';
import config from 'config';

const salts = Number(process.env.SALT_ROUNDS || config.get('SALT_ROUNDS'));

export default async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, salts);
}

module.exports = hashPassword;
