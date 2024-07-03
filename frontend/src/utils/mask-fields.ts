export const formatDocument = (value: string) => {
  const sanitizeValue = value.replace(/\D/g, '')

  const formattedValue = sanitizeValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18) // Limit the number of characters to 14
  return formattedValue
}

export const maskDocument = (mask: string, value: string) => {
  // Remove all non-numeric characters from the input value
  const sanitizeValue = mask.includes('A') ? value.replace(/[^a-zA-Z0-9]/g, '') : value.replace(/\D/g, '')

  // Initialize an array from the mask
  const maskArray = mask.split('')

  // Variable to hold the final formatted value
  let formattedValue = ''

  // Counter for the sanitized value
  let valueIndex = 0

  // Iterate over the mask array
  maskArray.forEach((char) => {
    if (valueIndex >= sanitizeValue.length) {
      return // Exit if there are no more characters in the input
    }

    // Check if the current character in the mask is a special formatting character
    if (char === 'X' || char === 'A') {
      // Assume 'X' is a placeholder for a digit in the mask
      formattedValue += sanitizeValue[valueIndex] // Append the corresponding value character
      valueIndex++ // Move to the next character in the input value
    } else {
      formattedValue += char // Append the mask character directly
    }
  })

  return formattedValue
}
