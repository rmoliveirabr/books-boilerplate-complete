export function validateDocumentCompanyBrazil(document: string) {
  // Remove non-numeric characters
  document = document.replace(/\D/g, '')

  // Check if DOCUMENT length is valid
  if (document.length !== 14) {
    return false
  }

  // Check for invalid sequences of identical digits
  if (/^(\d)\1+$/.test(document)) {
    return false
  }

  // Constants for check digit calculations
  const weightsFirstDigit = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const weightsSecondDigit = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  // Calculate first check digit
  let sumFirstDigit = 0
  for (let i = 0; i < 12; i++) {
    sumFirstDigit += parseInt(document.charAt(i)) * weightsFirstDigit[i]
  }
  let calculatedFirstDigit = 11 - (sumFirstDigit % 11)
  if (calculatedFirstDigit >= 10) {
    calculatedFirstDigit = 0
  }

  // Validate first check digit
  if (parseInt(document.charAt(12)) !== calculatedFirstDigit) {
    return false
  }

  // Calculate second check digit
  let sumSecondDigit = 0
  for (let i = 0; i < 13; i++) {
    sumSecondDigit += parseInt(document.charAt(i)) * weightsSecondDigit[i]
  }
  let calculatedSecondDigit = 11 - (sumSecondDigit % 11)
  if (calculatedSecondDigit >= 10) {
    calculatedSecondDigit = 0
  }

  // Validate second check digit
  if (parseInt(document.charAt(13)) !== calculatedSecondDigit) {
    return false
  }

  return true
}
