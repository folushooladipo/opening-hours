import React  from "react"

import {CLOSED_STATUS_TEXT} from "../../values"

import "./DailyScheduleRow.scss"

export interface IDailyScheduleRowProps {
  isToday: boolean;
  schedule: FormattedDailySchedule;
}

export const TODAY_LABEL = "TODAY"

const DailyScheduleRow: React.FunctionComponent<IDailyScheduleRowProps> = ({
  isToday,
  schedule,
}) => (
  <div className="daily-schedule-row">
    <div className="day-name bold-small">
      {schedule.day}
      {isToday && <span className="today-label">{TODAY_LABEL}</span>}
    </div>
    <div
      className={
        schedule.label === CLOSED_STATUS_TEXT
          ? "time-label closed"
          : "time-label"
      }
    >
      {schedule.label}
    </div>
  </div>
)

export default DailyScheduleRow
