import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function Empty() {
  const source = {uri: 'https://via.placeholder.com/150'};

  return (
    <View style={[styles.block]}>
      <Image
        // source={require('../assets/images/circle.png')}
        source={source}
        style={styles.image}
        resizeMode="center"
      />
      <Text style={[styles.description]}>야호! 할 일이 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 250,
  },
  description: {
    fontSize: 24,
    color: '#9e9e9e',
  },
});

export default Empty;
