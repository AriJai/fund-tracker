import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 * @param password The password to be hashed.
 * @returns The hashed password.
 */

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export default hashPassword;