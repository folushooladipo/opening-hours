/**
 * @name capitalize
 * @description Capitalizes the text it is given e.g "roundabout" to "Roundabout".
 * @param {string} text - The string to be capitalized.
 * @returns {string} - A capitalized string.
 */
const capitalize = (text: string): string => {
  if (text.length === 0) {
    return text
  }

  const capitalizedFirstLetter = text.substring(0, 1).toUpperCase()
  const restOfText = text.substring(1)
  return `${capitalizedFirstLetter}${restOfText}`
}

export default capitalize
