import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import {Text, TouchableOpacity, View} from 'react-native';
import HeaderlessScreen from './screens/HeaderlessScreen';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerLeft: ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Text>Left</Text>
    </TouchableOpacity>
  ),
  headerTitle: (props) => {
    // console.group('const stackOptions = { .. } → headerTitle: (props) => { .. }',);
    // console.log('props: ', props);

    const {children} = props;
    // console.log('children: ', children);
    // console.groupEnd();

    return (
      <View>
        <Text>{children}</Text>
      </View>
    );
  },
  headerRight: () => (
    <View>
      <Text>Right</Text>
    </View>
  ),
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈(options)',
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼들 색상
            headerTintColor: '#fff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={
            ({route}) => ({
              title: `상세 정보(options) - ${route.params.id}`,
              headerBackVisible: false,
              ...stackOptions,
            })
            // {
            //   headerLeft: ({onPress}) => (
            //     <TouchableOpacity onPress={onPress}>
            //       <Text>Left</Text>
            //     </TouchableOpacity>
            //   ),
            //   headerTitle: ({children}) => (
            //     <View>
            //       <Text>{children}</Text>
            //     </View>
            //   ),
            //   headerRight: () => (
            //     <View>
            //       <Text>Right</Text>
            //     </View>
            //   ),
            // }
            // ({route}) => ({
            //   title: `상세 정보(options) - ${route.params.id}`,
            // })
          }
        />
        <Stack.Screen
          name="Headerless"
          component={HeaderlessScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
