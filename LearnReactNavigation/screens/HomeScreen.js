import React, {useEffect} from 'react';
import {View, Button} from 'react-native';

function HomeScreen(props) {
  // console.group('function HomeScreen(props) { .. }');
  // console.log('props: ', props);

  const {navigation} = props;
  // console.log('navigation: ', navigation);
  // console.groupEnd();

  useEffect(() => {
    navigation.setOptions({
      title: '홈(setOptions)',
    });
  }, [navigation]);

  return (
    <View>
      <Button
        title="Detail 1 열기"
        onPress={() => navigation.push('Detail', {id: 1})}
      />
      <Button
        title="Detail 2 열기"
        onPress={() => navigation.push('Detail', {id: 2})}
      />
      <Button
        title="Detail 3 열기"
        onPress={() => navigation.push('Detail', {id: 3})}
      />
      <Button
        title="Headerless 열기"
        onPress={() => navigation.push('Headerless')}
      />
    </View>
  );
}

export default HomeScreen;
