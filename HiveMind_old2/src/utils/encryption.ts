import bcrypt from 'bcrypt';


/**
 * Encrypts a password using bcrypt with a salt of 10.
 * 
 * @param {string} password - The password to encrypt.
 * @returns {Promise<string>} - A promise that resolves to the encrypted password hash.
 */
export const encrypt = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

/**
 * Compares a password with a stored hash using bcrypt.
 * 
 * @param {string} password - The password to compare.
 * @param {string} hash - The stored hash to compare with.
 * @returns {Promise<boolean>} - A promise that resolves to true if the password matches the hash, false otherwise.
 */
export const compare = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};