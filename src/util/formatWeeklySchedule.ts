import {CLOSED_STATUS_TEXT, SINGLE_COMMA} from "../values"
import {capitalize, getTwelveHourFormat} from "."

const formatWeeklySchedule = (someSchedule: SortedDailySchedule[]): FormattedDailySchedule[] => {
  const schedule: FormattedDailySchedule[] = []

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
        // NB: this logic will wrap around from the last day of the week to
        // the first day e.g Saturday => Sunday.
        // NB: This assumes that closing time can at most be 1 day away.
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
