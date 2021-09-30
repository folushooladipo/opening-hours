import React from "react"
import {render} from "@testing-library/react"

import {
  scheduleWithHoursAndMinutes,
  scheduleWithMultiDaySlots,
  scheduleWithOddTimetables,
} from "../../sample-data"
import {CLOSED_STATUS_TEXT, ORDERED_WEEK_DAYS} from "../../values"
import {OpeningHours, OPENING_HOURS_TITLE, TITLE_FOR_SCHEDULE_ICON} from "."
import {capitalize, formatWeeklySchedule, getToday} from "../../util"

const commonSchedule: FormattedDailySchedule[] = formatWeeklySchedule(
  ORDERED_WEEK_DAYS.map((day) => ({
    day,
    timetable: scheduleWithMultiDaySlots[day],
  }))
)

describe("OpeningHours", () => {
  const today = getToday()

  test("shows the clock/schedule icon", () => {
    const {getByTitle} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    expect(getByTitle(TITLE_FOR_SCHEDULE_ICON))
  })

  test("shows the correct title", () => {
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    expect(getByText(OPENING_HOURS_TITLE)).toBeInTheDocument()
  })

  test("lists the days of the week in the desired order", () => {
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )

    ORDERED_WEEK_DAYS.forEach((day) =>
      expect(getByText(capitalize(day))).toBeInTheDocument()
    )
  })

  test("indicates days on which a restaurant is closed", () => {
    const {getAllByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    const closedDays = getAllByText(CLOSED_STATUS_TEXT)
    expect(closedDays.length).toEqual(2)
  })

  test("shows opening and closing times", () => {
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    expect(getByText("10 AM - 6 PM")).toBeInTheDocument()
    expect(getByText("12 PM - 9 PM")).toBeInTheDocument()
  })

  test("shows closing times that are in the next day", () => {
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    expect(getByText("10 AM - 2 AM")).toBeInTheDocument()
  })

  test("displays times that have both hour and minute portions", () => {
    const minuteAndHoursSchedule = formatWeeklySchedule(
      ORDERED_WEEK_DAYS.map((day) => ({
        day,
        timetable: scheduleWithHoursAndMinutes[day],
      }))
    )
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={minuteAndHoursSchedule}
        today={today}
      />
    )
    expect(getByText("9:30 AM - 10:15 PM")).toBeInTheDocument()
    expect(getByText("12 AM - 11:59 AM")).toBeInTheDocument()
    expect(getByText("6 PM - 1:20 AM")).toBeInTheDocument()
  })

  test("displays multiple opening and closing times for one day", () => {
    const multiOpenAndClosingTimesPerDay = formatWeeklySchedule(
      ORDERED_WEEK_DAYS.map((day) => ({
        day,
        timetable: scheduleWithOddTimetables[day],
      }))
    )
    const {getByText} = render(
      <OpeningHours
        formattedSchedule={multiOpenAndClosingTimesPerDay}
        today={today}
      />
    )
    expect(getByText("9 AM - 12 PM, 4 PM - 11 PM")).toBeInTheDocument()
    expect(getByText("7 AM - 9 AM, 12 PM - 2 PM, 3:30 PM - 5 PM, 7:45 PM - 10:20 PM, 11 PM - 10:15 PM")).toBeInTheDocument()
  })
})
