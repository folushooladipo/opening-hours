import React from "react"
import {render, screen} from "@testing-library/react"

import App from "./App"
import {OPENING_HOURS_TITLE} from "./components/OpeningHours/OpeningHours"

test("renders learn react link", () => {
  render(<App />)
  const title = screen.getByText(OPENING_HOURS_TITLE)
  expect(title).toBeInTheDocument()
})
