import bcrypt from 'bcrypt';

export default async function comparePasswords(inputPassword: string, comparedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(inputPassword, comparedPassword);
  } catch (error) {
    throw new Error(error.message);
  }
}
