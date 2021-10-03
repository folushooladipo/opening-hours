import React from "react"
import SelectSearch from "react-select-search/dist/cjs/index.js"

import "./App.scss"
import {ORDERED_WEEK_DAYS} from "./values"
import {OpeningHours} from "./components"
import {
  scheduleWithHoursAndMinutes,
  scheduleWithMultiDaySlots,
  scheduleWithOddTimetables,
} from "./sample-data"
import {formatWeeklySchedule, getToday} from "./util"

// TODO: make formatWeeklySchedule() to take WeeklySchedule instead of SortedDailySchedule.
const forClosesNextDay = formatWeeklySchedule(
  ORDERED_WEEK_DAYS.map((day) => ({
    day,
    timetable: scheduleWithMultiDaySlots[day],
  }))
)

const forOddTimetable = formatWeeklySchedule(
  ORDERED_WEEK_DAYS.map((day) => ({
    day,
    timetable: scheduleWithOddTimetables[day],
  }))
)

const forHoursAndMinutes = formatWeeklySchedule(
  ORDERED_WEEK_DAYS.map((day) => ({
    day,
    timetable: scheduleWithHoursAndMinutes[day],
  }))
)

const closesNextDayLabel = "Typical schedule. Also has slots that close on the next day"
const hoursAndMinutesLabel = "Times that have both hour and minute portions"
const oddTimetableLabel = "Odd timetable e.g opens and closes many times daily"
const searchOptions: SelectSearchOption[] = [
  {
    name: closesNextDayLabel,
    value: closesNextDayLabel,
  },
  {
    name: hoursAndMinutesLabel,
    value: hoursAndMinutesLabel,
  },
  {
    name: oddTimetableLabel,
    value: oddTimetableLabel,
  },
]

const labelToScheduleMap: {[key: string]: FormattedDailySchedule[]} = {
  [closesNextDayLabel]: forClosesNextDay,
  [hoursAndMinutesLabel]: forHoursAndMinutes,
  [oddTimetableLabel]: forOddTimetable,
}

export interface IAppState {
  selectedData: string;
}

export default class App extends React.Component<Record<string, never>, IAppState> {
  constructor(props: Record<string, never>) {
    super(props)

    this.state = {
      selectedData: closesNextDayLabel,
    }
  }

  render(): React.ReactNode {
    const {selectedData} = this.state
    const formattedSchedule = labelToScheduleMap[selectedData]
    const today = getToday()

    return (
      <div className="app-container">
        <OpeningHours
          formattedSchedule={formattedSchedule}
          today={today}
        />
        <p className="something-extra">
          Extra feature: choose other schedule data
        </p>
        <SelectSearch
          options={searchOptions}
          value={selectedData}
          onChange={(value: unknown) =>
            this.setState({selectedData: value as string})
          }
        />
      </div>
    )
  }
}
