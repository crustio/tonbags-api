import * as crypto from 'crypto';

/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * Encrypt password
 * @param password
 * @param salt
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export function calculateTotalFileSize<T>(data: T[], key: string) {
  if (data && data.length <= 0 && !key) return;
  let totalSize = 0;
  data.forEach((item) => {
    totalSize += parseInt(item[key] as string);
  });
  return formatBytes(totalSize);
}
