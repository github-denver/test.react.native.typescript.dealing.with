import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

function FeedList({logs, onScrolledToBottom}) {
  console.group('function FeedList({logs}) { .. }');
  // console.log('logs: ', logs);

  const onScroll = (event) => {
    console.group('const onScroll = (event) => { .. }');
    // console.log('event: ', event);

    if (!onScrolledToBottom) {
      return;
    }

    const {contentSize, layoutMeasurement, contentOffset} = event.nativeEvent;
    console.log('contentSize: ', JSON.stringify(contentSize, null, 2));
    console.log(
      'layoutMeasurement: ',
      JSON.stringify(layoutMeasurement, null, 2),
    );
    console.log('contentOffset: ', JSON.stringify(contentOffset, null, 2));

    const distanceFromBotton =
      contentSize.height - layoutMeasurement.height - contentOffset.y;
    console.log('distanceFromBotton: ', distanceFromBotton);

    if (
      contentSize.height > layoutMeasurement.height &&
      distanceFromBotton < 72
    ) {
      console.log('바닥과 가까워요.');

      onScrolledToBottom(true);
    } else {
      console.log('바닥과 멀어졌어요.');

      onScrolledToBottom(false);
    }
    console.groupEnd();
  };

  console.groupEnd();

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={(log) => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
