import React from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HeaderlessScreen({navigation}) {
  // console.group('function HeaderlessScreen({navigation}) { .. }');
  // console.log('navigation: ', navigation);
  // console.groupEnd();

  return (
    <SafeAreaView>
      <View>
        <Text>Header가 없네?</Text>
        <Button title="뒤로 가기" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
}

export default HeaderlessScreen;
