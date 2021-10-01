import {getToday} from ".."
import {JS_WEEK_OUTLINE} from "../../values"

describe("getToday", () => {
  test("returns the name of the current weekday", () => {
    const todayIndex = (new Date()).getDay()
    const today = JS_WEEK_OUTLINE[todayIndex]
    expect(getToday()).toEqual(today)
  })
})
