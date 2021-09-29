import React from "react"

import "./OpeningHours.css"
import {DailyScheduleRow} from "../DailyScheduleRow"

export interface IOpeningHoursProps {
  formattedSchedule: FormattedDailySchedule[]
}

const OpeningHours: React.FunctionComponent<IOpeningHoursProps> = (props) => (
  <div className="opening-hours-container">
    <h2>
      Opening hours
    </h2>
    <div className="daily-hours-rows">
      {
        props.formattedSchedule.map((schedule) =>
          <DailyScheduleRow
            key={`daily-schedule-row-${schedule.day}`}
            schedule={schedule}
          />
        )
      }
    </div>
  </div>
)

export default OpeningHours
