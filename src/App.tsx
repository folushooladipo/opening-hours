import React from "react"

import {ORDERED_WEEK_DAYS} from "./values"
import {OpeningHours} from "./components"
import {
  scheduleWithMultiDaySlots,
} from "./sample-data"
import {formatWeeklySchedule, getToday} from "./util"

const sortedSchedule: SortedDailySchedule[] = ORDERED_WEEK_DAYS.map((day) => ({
  day,
  timetable: scheduleWithMultiDaySlots[day],
}))

const formattedSchedule: FormattedDailySchedule[] = formatWeeklySchedule(
  sortedSchedule
)

const App = (): React.ReactElement => {
  const today = getToday()

  return (
    <div className="app-container">
      <OpeningHours
        formattedSchedule={formattedSchedule}
        today={today}
      />
    </div>
  )
}

export default App
