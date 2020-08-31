import bcrypt from 'bcrypt';
import config from 'config';

const localeSalts = config.get('SALT_ROUNDS');
const salts = Number(process.env.SALT_ROUNDS || localeSalts);

export default async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, salts);
}

module.exports = hashPassword;
