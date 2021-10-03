import {CLOSED_STATUS_TEXT, ORDERED_WEEK_DAYS, SINGLE_COMMA} from "../values"
import {capitalize, getTwelveHourFormat} from "."

const formatWeeklySchedule = (schedule: WeeklySchedule): FormattedDailySchedule[] => {
  const weekLength = ORDERED_WEEK_DAYS.length
  const formattedSchedule: FormattedDailySchedule[] = []

  // TODO: I think there's a way to flatten this into one while loop that uses two counters to keep track of dayIndex and periodIndex. Inspired by how I flattened the loops in the constructor for Percolation().
  for (let dayIndex = 0; dayIndex < weekLength; dayIndex++) {
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
      continue
    }

    let hoursText = ""
    let timeIndex = 0
    // Would have used Array.reduce() but that wouldn't let me halve the
    // number of iterations by handling two elements in each iteration.
    while (timeIndex < timetable.length) {
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
    }

    formattedSchedule[dayIndex] = {
      day: capitalizedDay,
      label: hoursText,
    }
  }

  return formattedSchedule
}

export default formatWeeklySchedule
