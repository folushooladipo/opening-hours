import {capitalize} from ".."

describe("capitalize", () => {
  test("returns an empty string when given an empty string", () => {
    expect(capitalize("")).toEqual("")
  })

  test("correctly capitalizes any string", () => {
    expect(capitalize("r")).toEqual("R")
    expect(capitalize("abc")).toEqual("Abc")
    expect(capitalize("the quick brown fox...")).toEqual("The quick brown fox...")
    expect(capitalize("123")).toEqual("123")
    expect(capitalize("Already capitalized.")).toEqual("Already capitalized.")
  })
})
