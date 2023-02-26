import {format} from 'date-fns';
import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import CalendarView from '../components/CalendarView';
import FeedList from '../components/FeedList';
import LogContext from '../contexts/LogContext';

function CalendarScreen() {
  const {logs} = useContext(LogContext);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  console.log('selectedDate: ', selectedDate);

  const markedDates = useMemo(() => {
    return logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');

      acc[formattedDate] = {marked: true};

      return acc;
    }, {});
  }, [logs]);
  console.log('markedDates: ', markedDates);

  const filteredLogs = logs.filter(
    (log) => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          style={styles.block}
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  block: {},
});

export default CalendarScreen;
