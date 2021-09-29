import React from "react"

import {ORDERED_WEEK_DAYS} from "./values"
import {OpeningHours} from "./components"
import {formatWeeklySchedule} from "./util"
import {
  scheduleWithTwoMultiDaySlots,
} from "./sample-data"

const sortedSchedule: SortedDailySchedule[] = ORDERED_WEEK_DAYS.map((day) => ({
  day,
  timetable: scheduleWithTwoMultiDaySlots[day],
}))

const formattedSchedule: FormattedDailySchedule[] = formatWeeklySchedule(
  sortedSchedule
)

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <OpeningHours formattedSchedule={formattedSchedule} />
    </div>
  )
}

export default App
