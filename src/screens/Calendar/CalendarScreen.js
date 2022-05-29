import React from "react";
import { Calendar } from 'react-native-calendar';


export function CalendarScreen() {
  return (

    <Calendar
      locale={"es"}
      onChange={(range) => console.log(range)}
      onPress={(Date) => console.log(Date)}
      minDate={new Date(2018, 3, 20)}
      startDate={new Date(2018, 3, 30)}
      endDate={new Date(2018, 4, 5)}
      theme={{
        activeDayColor: {},
        monthTitleTextStyle: {
          color: '#6d95da',
          fontWeight: '300',
          fontSize: 16,
        },
        emptyMonthContainerStyle: {},
        emptyMonthTextStyle: {
          fontWeight: '200',
        },
        weekColumnsContainerStyle: {},
        weekColumnStyle: {
          paddingVertical: 10,
        },
        weekColumnTextStyle: {
          color: '#b6c1cd',
          fontSize: 13,
        },
        nonTouchableDayContainerStyle: {},
        nonTouchableDayTextStyle: {},
        startDateContainerStyle: {},
        endDateContainerStyle: {},
        dayContainerStyle: {},
        dayTextStyle: {
          color: '#2d4150',
          fontWeight: '200',
          fontSize: 15,
        },
        dayOutOfRangeContainerStyle: {},
        dayOutOfRangeTextStyle: {},
        todayContainerStyle: {},
        todayTextStyle: {
          color: '#6d95da',
        },
        activeDayContainerStyle: {
          backgroundColor: '#6d95da',
        },
        activeDayTextStyle: {
          color: 'white',
        },
        nonTouchableLastMonthDayTextStyle: {},
      }}
    />

  );
}
