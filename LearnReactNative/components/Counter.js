import React from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';

function Counter({count, onIncrease, onDecrease}) {
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.numberArea]}>
        <Text style={[styles.number]}>{count}</Text>
      </View>

      <Button title="-1" onPress={onDecrease} />
      <Button title="+1" onPress={onIncrease} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  numberArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 72,
    fontWeight: 'bold',
  },
});

export default Counter;
