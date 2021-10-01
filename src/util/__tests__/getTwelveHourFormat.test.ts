import {getTwelveHourFormat, NEGATIVE_SECONDS_ERROR} from ".."
import {SECONDS_IN_ONE_HOUR, SECONDS_IN_ONE_MINUTE, SECONDS_IN_TWELVE_HOURS} from "../../values"

describe("getTwelveHourFormat", () => {
  test("throws an error if given negative seconds", () => {
    expect(
      () => getTwelveHourFormat(-1)
    ).toThrow(NEGATIVE_SECONDS_ERROR)
  })

  test("formats AM time correctly", () => {
    expect(getTwelveHourFormat(0)).toEqual("12 AM")
    expect(getTwelveHourFormat(36000)).toEqual("10 AM")
  })

  test("formats PM time correctly", () => {
    expect(getTwelveHourFormat(43200)).toEqual("12 PM")
    expect(getTwelveHourFormat(46800)).toEqual("1 PM")
  })

  test("correctly formats times that have hour and minute sections", () => {
    expect(getTwelveHourFormat(60)).toEqual("12:01 AM")
    expect(getTwelveHourFormat(15060)).toEqual("4:11 AM")
    expect(getTwelveHourFormat(48000)).toEqual("1:20 PM")
    expect(getTwelveHourFormat(67620)).toEqual("6:47 PM")
  })

  test("correctly formats times at the edge of the AM and PM periods i.e 11:59 AM and 11:59 PM", () => {
    expect(getTwelveHourFormat((SECONDS_IN_ONE_HOUR * 12) - SECONDS_IN_ONE_MINUTE)).toEqual("11:59 AM")
    expect(getTwelveHourFormat((SECONDS_IN_ONE_HOUR * 24) - SECONDS_IN_ONE_MINUTE)).toEqual("11:59 PM")
  })

  test("correctly formats times that are a second short of a full minute or a full hour", () => {
    const oneSecond = 1
    const amEight = 8 * SECONDS_IN_ONE_HOUR
    const amSevenFiftyNine = amEight - oneSecond
    expect(getTwelveHourFormat(amSevenFiftyNine)).toEqual("7:59 AM")

    const amSixFiftyTwo = (6 * SECONDS_IN_ONE_HOUR) + (52 * SECONDS_IN_ONE_MINUTE)
    const amSixFiftyOne = amSixFiftyTwo - oneSecond
    expect(getTwelveHourFormat(amSixFiftyOne)).toEqual("6:51 AM")

    const amElevenFiftyNine = SECONDS_IN_TWELVE_HOURS - oneSecond
    expect(getTwelveHourFormat(amElevenFiftyNine)).toEqual("11:59 AM")

    const pmNineTwentyFive = (21 * SECONDS_IN_ONE_HOUR) + (25 * SECONDS_IN_ONE_MINUTE)
    const pmNineTwentyFour = pmNineTwentyFive - oneSecond
    expect(getTwelveHourFormat(pmNineTwentyFour)).toEqual("9:24 PM")

    const pmElevenFiftyNine = (SECONDS_IN_TWELVE_HOURS * 2) - oneSecond
    expect(getTwelveHourFormat(pmElevenFiftyNine)).toEqual("11:59 PM")
  })

  test("correctly formats times with minute portions that are less than 10 e.g 3:05 AM", () => {
    const amThreeZeroFive = (3 * SECONDS_IN_ONE_HOUR) + (5 * SECONDS_IN_ONE_MINUTE)
    expect(getTwelveHourFormat(amThreeZeroFive)).toEqual("3:05 AM")

    const pmTwoZeroNine = (14 * SECONDS_IN_ONE_HOUR) + (9 * SECONDS_IN_ONE_MINUTE)
    expect(getTwelveHourFormat(pmTwoZeroNine)).toEqual("2:09 PM")

    const pmTenZeroOne = (22 * SECONDS_IN_ONE_HOUR) + SECONDS_IN_ONE_MINUTE
    expect(getTwelveHourFormat(pmTenZeroOne)).toEqual("10:01 PM")
  })
})
