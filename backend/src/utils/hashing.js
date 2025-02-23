import bcrypt from 'bcrypt';


/**
 * Encrypts a password using bcrypt with a salt of 10.
 * 
 * @param password - The password to encrypt.
 * @returns - A promise that resolves to the encrypted password hash.
 */
export const encrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Compares a password with a stored hash using bcrypt.
 * 
 * @param password - The password to compare.
 * @param hash - The stored hash to compare with.
 * @returns - A promise that resolves to true if the password matches the hash, false otherwise.
 */
export const compare = async (password, hash)=> {
  return await bcrypt.compare(password, hash);
};