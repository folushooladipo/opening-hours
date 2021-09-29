declare type DayName =
  "monday" |
  "tuesday" |
  "wednesday" |
  "thursday" |
  "friday" |
  "saturday" |
  "sunday"

declare type OpenOrClosedTime = {
  type: "open" | "close";
  value: number;
}

declare type WeeklySchedule = {
  [key in DayName]: OpenOrClosedTime[];
}

declare type SortedDailySchedule = {
  day: DayName;
  timetable: OpenOrClosedTime[];
}

declare type CapitalizedDayName =
  "Monday" |
  "Tuesday" |
  "Wednesday" |
  "Thursday" |
  "Friday" |
  "Saturday" |
  "Sunday"

declare type FormattedDailySchedule = {
  day: CapitalizedDayName;
  label: string;
}
