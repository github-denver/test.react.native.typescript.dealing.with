import React from 'react';
import {Text, View} from 'react-native';

function Greeting(props) {
  return (
    <>
      <View>
        <Text>안녕하세요! {props.name}</Text>
      </View>

      <Text>Extra Text!</Text>
    </>
  );
}

Greeting.defaultProps = {
  name: '리액트 네이티브',
};

export default Greeting;
