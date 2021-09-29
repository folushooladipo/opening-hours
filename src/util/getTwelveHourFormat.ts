import {
  SECONDS_IN_ONE_HOUR,
  SECONDS_IN_ONE_MINUTE,
  SECONDS_IN_TWELVE_HOURS,
  SINGLE_COLON,
} from "../values"

const getTwelveHourFormat = (seconds: number): string => {
  // Rather than try to use a Date instance...
  const secondsInTwelveHourRange = seconds % SECONDS_IN_TWELVE_HOURS
  const decimalHoursAndMinutes = secondsInTwelveHourRange / SECONDS_IN_ONE_HOUR
  const hours = Math.floor(decimalHoursAndMinutes)
  const hoursText = hours === 0 ? "12" : `${hours}`
  const minutes = Math.round((decimalHoursAndMinutes % 1) * SECONDS_IN_ONE_MINUTE)
  const minutesText = minutes === 0 ? "" : `${minutes}`
  const amOrPm = seconds < SECONDS_IN_TWELVE_HOURS ? "AM" : "PM"
  const formattedTime = `${hoursText}${minutesText.length ? SINGLE_COLON : ""}${minutesText} ${amOrPm}`

  return formattedTime
}

export default getTwelveHourFormat
