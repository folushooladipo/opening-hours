import React from "react"
import {render} from "@testing-library/react"

import {
  scheduleWithMultiDaySlots,
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

  test("displays a restaurant's schedule for the week", () => {
    const {getAllByText, getByText} = render(
      <OpeningHours
        formattedSchedule={commonSchedule}
        today={today}
      />
    )
    const closedDays = getAllByText(CLOSED_STATUS_TEXT)
    expect(closedDays.length).toEqual(2)
    expect(getByText("8 AM - 1 AM")).toBeInTheDocument()
    expect(getByText("12 PM - 9 PM")).toBeInTheDocument()
  })
})
