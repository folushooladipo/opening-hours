import React  from "react"

export interface IDailyScheduleRowProps {
  schedule: FormattedDailySchedule;
}

const DailyScheduleRow: React.FunctionComponent<IDailyScheduleRowProps> = (props) => (
  <div>
    {props.schedule.day}
    {props.schedule.label}
  </div>
)

export default DailyScheduleRow
