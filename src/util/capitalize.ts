// TODO: add unit tests and then jsdocs for this.
const capitalize = (text: string): string => {
  if (text.length === 0) {
    return text
  }

  const capitalizedFirstLetter = text.substring(0, 1).toUpperCase()
  const restOfText = text.substring(1)
  return `${capitalizedFirstLetter}${restOfText}`
}

export default capitalize
