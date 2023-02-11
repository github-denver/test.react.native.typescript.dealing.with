import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Text, View, Button, SafeAreaView} from 'react-native';

const Drawer = createDrawerNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.openDrawer('Setting')}
      />
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View>
      <Text>SettingScreen</Text>
      <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

function DrawerContent(navigation) {
  return (
    <SafeAreaView>
      <Text>A Custom Drawer</Text>
      <Button onPress={() => navigation.closeDrawer()} title="Drawer 닫기" />
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="left"
        backBehavior="history"
        screenOptions={{
          drawerActiveBackgroundColor: '#fb8c00',
          drawerActiveTintColor: 'white',
          headerShown: false,
        }}
        drawerContent={({navigation}) => DrawerContent(navigation)}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈', headerLeft: () => <Text>Left</Text>}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
