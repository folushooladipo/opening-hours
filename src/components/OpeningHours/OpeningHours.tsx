import React from "react"
import {Schedule} from "@styled-icons/material"

import "./OpeningHours.scss"
import {DailyScheduleRow} from "../DailyScheduleRow"

export interface IOpeningHoursProps {
  formattedSchedule: FormattedDailySchedule[];
  today: CapitalizedDayName;
}

const OpeningHours: React.FunctionComponent<IOpeningHoursProps> = ({
  formattedSchedule,
  today,
}) => (
  <div className="opening-hours-container">
    <div className="title-container">
      <Schedule
        size="25"
        className="icon"
      />
      <h2 className="title bold-large">
        Opening hours
      </h2>
    </div>
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
