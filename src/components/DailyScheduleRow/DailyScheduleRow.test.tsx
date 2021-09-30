import React from "react"
import {render} from "@testing-library/react"

import {DailyScheduleRow, TODAY_LABEL} from "."

const openDay: FormattedDailySchedule = {
  day: "Tuesday",
  label: "9 AM - 6 PM",
}

const closedDay: FormattedDailySchedule = {
  day: "Saturday",
  label: "Closed",
}

const closesNextDay: FormattedDailySchedule = {
  day: "Wednesday",
  label: "10 AM - 2 AM",
}

const dayWithHoursAndMinutes: FormattedDailySchedule = {
  day: "Friday",
  label: "6:15 PM - 1:20 AM",
}

const dayWithManyOpeningAndClosingTimes: FormattedDailySchedule = {
  day: "Tuesday",
  label: "7 AM - 9 AM, 12 PM - 2 PM, 3:30 PM - 5 PM, 7:45 PM - 10:20 PM, 11 PM - 10:15 PM",
}

describe("DailyScheduleRow", () => {
  test("displays the weekday and the restaurant's operating hours", () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday={false}
        schedule={openDay}
      />
    )
    expect(getByText(openDay.day)).toBeInTheDocument()
    expect(getByText(openDay.label)).toBeInTheDocument()
  })

  test(`shows the "TODAY" label when appropriate`, () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday
        schedule={openDay}
      />
    )
    expect(getByText(TODAY_LABEL)).toBeInTheDocument()
  })

  test("displays that the restaurant is closed", () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday={false}
        schedule={closedDay}
      />
    )
    expect(getByText(closedDay.day)).toBeInTheDocument()
  })

  test("shows closing times that are in the next day", () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday={false}
        schedule={closesNextDay}
      />
    )
    expect(getByText(closesNextDay.label)).toBeInTheDocument()
  })

  test("displays times that have both hour and minute sections", () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday={false}
        schedule={dayWithHoursAndMinutes}
      />
    )
    expect(getByText(dayWithHoursAndMinutes.label)).toBeInTheDocument()
  })

  test("displays multiple opening and closing times for one day", () => {
    const {getByText} = render(
      <DailyScheduleRow
        isToday={false}
        schedule={dayWithManyOpeningAndClosingTimes}
      />
    )
    expect(getByText(dayWithManyOpeningAndClosingTimes.label)).toBeInTheDocument()
  })
})
