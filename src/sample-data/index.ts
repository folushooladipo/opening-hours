export const scheduleWithClosesNextDaySlots: WeeklySchedule = {
  monday: [],
  tuesday: [
    {type: "open", value: 32400},
    {type: "close", value: 64800},
  ],
  wednesday: [],
  thursday: [
    {type: "open", value: 36000},
    {type: "close", value: 64800},
  ],
  friday: [
    {type: "open", value: 28800},
  ],
  saturday: [
    {type: "close", value: 3600},
    {type: "open", value: 36000},
  ],
  sunday: [
    {type: "close", value: 7200},
    {type: "open", value: 43200},
    {type: "close", value: 75600},
  ],
}

export const scheduleWithHoursAndMinutes: WeeklySchedule = {
  monday: [],
  tuesday: [
    {type: "open", value: 34200}, // 9:30 AM
    {type: "close", value: 66600}, // 6:30 PM
    {type: "open", value: 80100}, // 10:15 PM
  ],
  wednesday: [
    {type: "close", value: 7200},
  ],
  thursday: [
    {type: "open", value: 21600},
    {type: "close", value: 43140}, // 11:59 AM = SECONDS_IN_TWELVE_HOURS - SECONDS_IN_ONE_MINUTE
  ],
  friday: [
    {type: "open", value: 64800},
  ],
  saturday: [
    {type: "close", value: 4800}, // 1:20 AM
    {type: "open", value: 32400},
    {type: "close", value: 43200},
    {type: "close", value: 82800},
  ],
  sunday: [
    {type: "close", value: 3600},
    {type: "open", value: 43200},
    {type: "close", value: 75600},
  ],
}

export const scheduleWithOddTimetable: WeeklySchedule = {
  monday: [
    // Note: since all Monday has is a "Closed entry" that is for Sunday, it should show "Closed" itself.
    {type: "close", value: 12780}, // 3:33 AM
  ],
  tuesday: [
    // Opens and closes more than 5 times
    {type: "open", value: 25200}, // 7 AM
    {type: "close", value: 32400}, // 9 AM
    {type: "open", value: 43200}, // 12 PM
    {type: "close", value: 50400}, // 2 PM
    {type: "open", value: 55800}, // 3:30 PM
    {type: "close", value: 61200}, // 5 PM
    {type: "open", value: 71100}, // 7:45 PM
    {type: "close", value: 80388}, // 10:20 PM
    {type: "open", value: 82800}, // 11 PM
  ],
  wednesday: [
    {type: "close", value: 80100}, // 10:15 PM
  ],
  thursday: [
    {type: "open", value: 0}, // 12 AM
    {type: "close", value: 43140}, // 11:59 AM = SECONDS_IN_TWELVE_HOURS - SECONDS_IN_ONE_MINUTE
  ],
  friday: [
    {type: "open", value: 65700}, // 6:15 PM
  ],
  saturday: [
    {type: "close", value: 4800}, // 1:20 AM
    {type: "open", value: 32400},
    {type: "close", value: 43200}, // 12 PM
    {type: "open", value: 57600},
    {type: "close", value: 82800},
  ],
  sunday: [
    {type: "close", value: 3600},
    {type: "open", value: 43200},
  ],
}
