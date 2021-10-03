import {CLOSED_STATUS_TEXT, ORDERED_WEEK_DAYS, SINGLE_COMMA} from "../values"
import {capitalize, getTwelveHourFormat} from "."

const formatWeeklySchedule = (schedule: WeeklySchedule): FormattedDailySchedule[] => {
  const weekLength = ORDERED_WEEK_DAYS.length
  const formattedSchedule: FormattedDailySchedule[] = []

  /* The most obvious solution for this involved using a nested, two-layer loop, which
  was what I did initially. Checkout the current file in the commit below for more info:
    17c565003429afb594ff60f038a471c3faa47f4b

  Those loops practically had O(N) complexity even though they were nested. That was
  because even though a restaurant can open/close N times a day, a week doesn't vary
  in its number of days.

  However, I always try to flatten nested loops because they almost always have
  non-linear worst-case time complexity. That was when I realized that I could use
  a single while loop instead, as seen below.
  */

  let dayIndex = 0
  let timeIndex = 0
  let hoursText = ""
  while (dayIndex < weekLength) {
    const day = ORDERED_WEEK_DAYS[dayIndex]
    const capitalizedDay = capitalize(day) as CapitalizedDayName
    const timetable = schedule[day]
    if (timetable.length === 0 ||
      (timetable.length === 1 && timetable[0].type === "close")
    ) {
      formattedSchedule[dayIndex] = {
        day: capitalizedDay,
        label: CLOSED_STATUS_TEXT,
      }
      dayIndex++
      continue
    }

    if (timeIndex === 0 && timetable[timeIndex].type === "close") {
      timeIndex++
      continue
    }

    const openingTime = timetable[timeIndex]
    const labelForOpeningTime = getTwelveHourFormat(openingTime.value)

    let closingTime = timetable[timeIndex + 1]
    if (!closingTime) {
      const indexOfNextDay = (dayIndex + 1) % weekLength
      const nextDay = ORDERED_WEEK_DAYS[indexOfNextDay]
      const nextDayTimetable = schedule[nextDay]
      closingTime = nextDayTimetable[0]
    }
    const labelForClosingTime = getTwelveHourFormat(closingTime.value)

    hoursText = hoursText.length > 0
      ? `${hoursText}${SINGLE_COMMA} ${labelForOpeningTime} - ${labelForClosingTime}`
      : `${labelForOpeningTime} - ${labelForClosingTime}`

    timeIndex += 2
    if (timeIndex > timetable.length - 1) {
      formattedSchedule[dayIndex] = {
        day: capitalizedDay,
        label: hoursText,
      }
      hoursText = ""
      timeIndex = 0
      dayIndex++
    }
  }

  return formattedSchedule
}

export default formatWeeklySchedule
