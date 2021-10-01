import {JS_WEEK_OUTLINE} from "../values"

/**
 * @name getToday
 * @description Determines the capitalized name of the current weekday e.g
 * Tuesday.
 * @returns {CapitalizedDayName} - returns the capitalized name of the
 * current weekday.
 */
const getToday = (): CapitalizedDayName => {
  const indexOfDayInWeek = new Date().getDay()
  const today = JS_WEEK_OUTLINE[indexOfDayInWeek]

  return today
}

export default getToday
