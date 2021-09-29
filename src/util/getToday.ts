const weekOutlineUsedByJavaScript: CapitalizedDayName[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const getToday = (): CapitalizedDayName => {
  const indexOfDayInWeek = new Date().getDay()
  const today = weekOutlineUsedByJavaScript[indexOfDayInWeek]

  return today
}

export default getToday
