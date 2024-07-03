import crypto from 'node:crypto'

export const charsets = {
  NUMBERS: '0123456789',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  SYMBOLS: '!#$%~',
}

export default function generatePassword(
  length: number,
  charset: string = charsets.NUMBERS + charsets.LOWERCASE + charsets.UPPERCASE + charsets.SYMBOLS,
): string {
  const charsetLength = charset.length

  let password = ''

  while (length--) {
    password += charset[crypto.randomInt(charsetLength)]
  }

  return password
}
