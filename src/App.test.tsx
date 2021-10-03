import React from "react"
import {render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import App, {
  closesNextDayLabel,
  hoursAndMinutesLabel,
  DATA_SWITCHER_INPUT_PLACEHOLDER,
  TITLE_FOR_DATA_SWITCHER,
} from "./App"
import {OPENING_HOURS_TITLE} from "./components/OpeningHours/OpeningHours"

describe("App", () => {
  test("renders the restaurant's schedule", () => {
    const {getByText} = render(<App />)
    expect(getByText(OPENING_HOURS_TITLE)).toBeInTheDocument()
  })

  test("by default, hides the button for switching schedule data", () => {
    const {queryByPlaceholderText, queryByText} = render(<App />)
    expect(queryByText(TITLE_FOR_DATA_SWITCHER)).toEqual(null)
    expect(queryByPlaceholderText(DATA_SWITCHER_INPUT_PLACEHOLDER)).toEqual(null)
  })

  test("displays the data switching section when appropriate", () => {
    const {getByPlaceholderText, getByText} = render(<App enableDataSwitching />)
    expect(getByText(TITLE_FOR_DATA_SWITCHER)).toBeInTheDocument()
    expect(getByPlaceholderText(DATA_SWITCHER_INPUT_PLACEHOLDER)).toBeInTheDocument()
  })

  test("when appropriate, displays a dropdown for choosing schedule data", () => {
    const {getByPlaceholderText, getByText, queryByText} = render(<App enableDataSwitching />)
    expect(queryByText(closesNextDayLabel)).toEqual(null)
    expect(queryByText(hoursAndMinutesLabel)).toEqual(null)

    const inputForDataSwitcher = getByPlaceholderText(DATA_SWITCHER_INPUT_PLACEHOLDER)
    userEvent.click(inputForDataSwitcher)
    expect(queryByText(closesNextDayLabel)).toBeInTheDocument()
    expect(queryByText(hoursAndMinutesLabel)).toBeInTheDocument()

    userEvent.type(inputForDataSwitcher, hoursAndMinutesLabel)
    expect(queryByText(closesNextDayLabel)).toEqual(null)
    expect(getByText(hoursAndMinutesLabel)).toBeInTheDocument()

    expect(queryByText("9:30 AM - 6:30 PM, 10:15 PM - 2 AM")).toEqual(null)
    userEvent.click(getByText(hoursAndMinutesLabel))
    expect(getByText("9:30 AM - 6:30 PM, 10:15 PM - 2 AM")).toBeInTheDocument()
  })
})
