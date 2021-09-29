import React  from "react"

import "./DailyScheduleRow.scss"

export interface IDailyScheduleRowProps {
  isToday: boolean;
  schedule: FormattedDailySchedule;
}

const TODAY_LABEL = "TODAY"

const DailyScheduleRow: React.FunctionComponent<IDailyScheduleRowProps> = ({
  isToday,
  schedule,
}) => (
  <div className="daily-schedule-row">
    <div className="day-name">
      {schedule.day}
      {
        isToday && <span className="today-label">{TODAY_LABEL}</span>
      }
    </div>
    {schedule.label}
  </div>
)

export default DailyScheduleRow
