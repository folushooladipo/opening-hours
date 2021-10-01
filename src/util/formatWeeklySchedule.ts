import {CLOSED_STATUS_TEXT, SINGLE_COMMA} from "../values"
import {capitalize, getTwelveHourFormat} from "."

const formatWeeklySchedule = (someSchedule: SortedDailySchedule[]): FormattedDailySchedule[] => {
  const schedule: FormattedDailySchedule[] = []

  // TODO: I think there's a way to flatten this into one while loop that uses two counters to keep track of dayIndex and periodIndex. Inspired by how I flattened the loops in the constructor for Percolation().
  for (let dayIndex = 0; dayIndex < someSchedule.length; dayIndex++) {
    const {day, timetable} = someSchedule[dayIndex]
    const capitalizedDay = capitalize(day) as CapitalizedDayName
    if (timetable.length === 0 ||
      (timetable.length === 1 && timetable[0].type === "close")
    ) {
      schedule[dayIndex] = {
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
        const lengthOfWeek = someSchedule.length
        const indexOfNextDay = (dayIndex + 1) % lengthOfWeek
        closingTime = someSchedule[indexOfNextDay].timetable[0]
      }
      const labelForClosingTime = getTwelveHourFormat(closingTime.value)

      hoursText = hoursText.length > 0
        ? `${hoursText}${SINGLE_COMMA} ${labelForOpeningTime} - ${labelForClosingTime}`
        : `${labelForOpeningTime} - ${labelForClosingTime}`

      timeIndex += 2
    }

    schedule[dayIndex] = {
      day: capitalizedDay,
      label: hoursText,
    }
  }

  return schedule
}

export default formatWeeklySchedule
