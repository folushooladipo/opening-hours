import {formatWeeklySchedule} from ".."
import {scheduleWithHoursAndMinutes} from "../../sample-data"
import {CLOSED_STATUS_TEXT} from "../../values"

const schedule = formatWeeklySchedule(scheduleWithHoursAndMinutes)

describe("formatWeeklySchedule", () => {
  test("determines and capitalizes the name of each weekday", () => {
    expect(schedule[0].day).toEqual("Monday")
    expect(schedule[1].day).toEqual("Tuesday")
    expect(schedule[6].day).toEqual("Sunday")
  })

  test(`assigns "${CLOSED_STATUS_TEXT}" to days that have no schedule data`, () => {
    const mondaySchedule = schedule[0]
    expect(mondaySchedule.label).toEqual(CLOSED_STATUS_TEXT)
  })

  test(`assigns "${CLOSED_STATUS_TEXT}" to days that have just one schedule entry which is for closing time`, () => {
    const wednesdaySchedule = schedule[2]
    expect(wednesdaySchedule.label).toEqual(CLOSED_STATUS_TEXT)
  })

  test("determines the opening and closing time of a day", () => {
    const thursdaySchedule = schedule[3]
    expect(thursdaySchedule.label).toEqual("6 AM - 11:59 AM")

    const sundaySchedule = schedule[6]
    expect(sundaySchedule.label).toEqual("12 PM - 9 PM")
  })

  test("identifies closing times that fall in the next day", () => {
    const tuesdaySchedule = schedule[1]
    expect(tuesdaySchedule.label).toContain("10:15 PM - 2 AM")

    const fridaySchedule = schedule[4]
    expect(fridaySchedule.label).toEqual("6 PM - 1:20 AM")
  })

  test("determines multiple opening and closing times for one day", () => {
    const tuesdaySchedule = schedule[1]
    expect(tuesdaySchedule.label).toEqual("9:30 AM - 6:30 PM, 10:15 PM - 2 AM")

    const saturdaySchedule = schedule[5]
    expect(saturdaySchedule.label).toEqual("9 AM - 12 PM, 11 PM - 1 AM")
  })
})
