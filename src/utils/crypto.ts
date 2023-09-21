import * as crypto from 'crypto';
export const encry = (value: string, salt: string) => {
  return crypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');
};
