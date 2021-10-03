import React from "react"
import SelectSearch from "react-select-search/dist/cjs/index.js"

import "./App.scss"
import {OpeningHours} from "./components"
import {
  scheduleWithClosesNextDaySlots,
  scheduleWithHoursAndMinutes,
  scheduleWithOddTimetable,
} from "./sample-data"
import {formatWeeklySchedule, getToday} from "./util"

const forClosesNextDay = formatWeeklySchedule(scheduleWithClosesNextDaySlots)
const forOddTimetable = formatWeeklySchedule(scheduleWithOddTimetable)
const forHoursAndMinutes = formatWeeklySchedule(scheduleWithHoursAndMinutes)

export const closesNextDayLabel = "Typical schedule. Also has slots that close on the next day."
export const hoursAndMinutesLabel = "Times that have both hour and minute portions."
const oddTimetableLabel = "Odd timetable e.g opens and closes many times daily."
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

export const TITLE_FOR_DATA_SWITCHER = "Choose other schedule data"
export const DATA_SWITCHER_INPUT_PLACEHOLDER = "Search"

export interface IAppProps {
  enableDataSwitching?: boolean;
}

export interface IAppState {
  canSwitchData: boolean;
  selectedData: string;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)

    this.getOptionsFilter = this.getOptionsFilter.bind(this)

    const canSwitchData = typeof props.enableDataSwitching === "boolean"
      ? props.enableDataSwitching
      : (new URLSearchParams(location.search)).get("dataSwitching")?.toLowerCase() === "on"
    this.state = {
      canSwitchData,
      selectedData: closesNextDayLabel,
    }
  }

  getOptionsFilter(options: SelectSearchOption[]): ((query: string) => SelectSearchOption[]) {
    return (query: string): SelectSearchOption[] => {
      if (typeof query !== "string" || !query.length) {
        return options
      }

      return options.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      )
    }
  }

  render(): React.ReactNode {
    const {selectedData, canSwitchData} = this.state
    const formattedSchedule = labelToScheduleMap[selectedData]
    const today = getToday()

    return (
      <div className="app-container">
        {
          canSwitchData &&
          [
            <p
              key="data-switcher-title"
              className="data-switcher-title"
            >
              {TITLE_FOR_DATA_SWITCHER}
            </p>,
            <SelectSearch
              key="select-search"
              options={searchOptions}
              value={selectedData}
              placeholder={DATA_SWITCHER_INPUT_PLACEHOLDER}
              search
              filterOptions={this.getOptionsFilter}
              onChange={(value: unknown) =>
                this.setState({selectedData: value as string})
              }
            />,
          ]
        }
        <OpeningHours
          formattedSchedule={formattedSchedule}
          today={today}
        />
      </div>
    )
  }
}
