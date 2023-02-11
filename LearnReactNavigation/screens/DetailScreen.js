import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

function IDText() {
  const route = useRoute();

  return <Text style={styles.text}>id: {route.params.id}</Text>;
}

function DetailScreen(props) {
  // console.group('function DetailScreen(props) { .. }');
  // console.log('props: ', props);

  const {route, navigation} = props;
  // console.log('route: ', route);
  // console.groupEnd();

  useEffect(() => {
    navigation.setOptions({
      title: `상세 정보(setOptions) - ${route.params.id}`,
    });
  }, [navigation, route.params.id]);

  return (
    <View style={styles.block}>
      {/* <Text style={styles.text}>id: {route.params.id}</Text> */}
      <IDText />

      <View style={styles.buttons}>
        <Button
          title="다음(push)"
          onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
        />

        <Button
          title="다음(navigate)"
          onPress={() =>
            navigation.navigate('Detail', {id: route.params.id + 1})
          }
        />

        <Button title="뒤로 가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  },
  buttons: {
    flexDirection: 'row',
  },
});

export default DetailScreen;
