import React from "react"
import {Schedule} from "@styled-icons/material"

import "./OpeningHours.scss"
import {DailyScheduleRow} from "../DailyScheduleRow"

export interface IOpeningHoursProps {
  formattedSchedule: FormattedDailySchedule[];
  today: CapitalizedDayName;
}

export const TITLE_FOR_SCHEDULE_ICON = "Schedule icon"
export const OPENING_HOURS_TITLE = "Opening hours"
const OpeningHours: React.FunctionComponent<IOpeningHoursProps> = ({
  formattedSchedule,
  today,
}) => (
  <div className="opening-hours-container">
    <div className="title-container">
      <Schedule
        size="25"
        title={TITLE_FOR_SCHEDULE_ICON}
        className="icon"
      />
      <h2 className="title bold-large">
        {OPENING_HOURS_TITLE}
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
