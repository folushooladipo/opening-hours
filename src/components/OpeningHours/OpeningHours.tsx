import React from "react"
import {Schedule} from "@styled-icons/material"

import "./OpeningHours.scss"
import {DailyScheduleRow} from "../DailyScheduleRow"

export interface IOpeningHoursProps {
  formattedSchedule: FormattedDailySchedule[]
  today: CapitalizedDayName;
}

const OpeningHours: React.FunctionComponent<IOpeningHoursProps> = ({
  formattedSchedule,
  today,
}) => (
  <div className="opening-hours-container">
    <h2>
      <Schedule size="25" />
      Opening hours
    </h2>
    <div className="daily-hours-rows">
      {
        formattedSchedule.map((schedule) =>
          <DailyScheduleRow
            key={`daily-schedule-row-${schedule.day}`}
            schedule={schedule}
            isToday={schedule.day === today}
          />
        )
      }
    </div>
  </div>
)

export default OpeningHours
