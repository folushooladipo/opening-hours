import {
  SECONDS_IN_ONE_HOUR,
  SECONDS_IN_ONE_MINUTE,
  SECONDS_IN_TWELVE_HOURS,
  SINGLE_COLON,
} from "../values"

export const NEGATIVE_SECONDS_ERROR = "The time in seconds cannot be a negative number."
/**
 * @name getTwelveHourFormat
 * @description Formats a given number of seconds after midnight as AM/PM time e.g
 * 0 = 12 AM, 36000 = 10 AM, 71100 = 7:30 PM etc.
 * @param {number} seconds - The number of seconds past midnight. This value should
 * be in the range -1 < seconds < SECONDS_IN_A_DAY, where
 * SECONDS_IN_A_DAY = 60 * 60 * 24 = 86,400 seconds.
 * @throws Throws an error when seconds is a negative number.
 * @returns {string} - The AM/PM time represented by the number of seconds given.
 */
const getTwelveHourFormat = (seconds: number): string => {
  if (seconds < 0) {
    throw new Error(NEGATIVE_SECONDS_ERROR)
  }

  // Rather use a Date instance...
  const secondsInTwelveHourRange = seconds % SECONDS_IN_TWELVE_HOURS
  const hours = Math.floor(secondsInTwelveHourRange / SECONDS_IN_ONE_HOUR)
  const hoursText = hours === 0 ? "12" : `${hours}`
  const minutes = Math.floor(
    (secondsInTwelveHourRange / SECONDS_IN_ONE_MINUTE) % SECONDS_IN_ONE_MINUTE
  )
  const minutesText = minutes === 0
    ? ""
    : minutes < 10 ? `0${minutes}` : `${minutes}`
  const amOrPm = seconds < SECONDS_IN_TWELVE_HOURS ? "AM" : "PM"
  const formattedTime = `${hoursText}${minutesText.length ? SINGLE_COLON : ""}${minutesText} ${amOrPm}`

  return formattedTime
}

export default getTwelveHourFormat
