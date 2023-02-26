import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView({markedDates, selectedDate, onSelectedDate}) {
  // 현재 연/월 사용하기
  // const markedDates = {
  //   '2023-02-01': {
  //     selected: true,
  //   },
  //   '2023-02-02': {
  //     marked: true,
  //   },
  //   '2023-02-03': {
  //     marked: true,
  //   },
  // };

  const markedSelectedDate = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={styles.calendar}
      // markedDates={markedDates}
      markedDates={markedSelectedDate}
      onDayPress={(day) => {
        onSelectedDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
