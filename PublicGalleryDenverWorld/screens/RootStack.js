import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreens';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';

const Stack = createNativeStackNavigator();

function RootStack() {
  console.group('function RootStack() { .. }');

  const {user, setUser} = useUserContext();
  console.log('user: ', user);

  useEffect(() => {
    // 컴포넌트 첫 로딩 시 로그인 상태를 확인하고 UserContext에 적용
    const unsubscribe = subscribeAuth(async currentUser => {
      console.group(
        'const unsubscribe = subscribeAuth(async currentUser => { .. }',
      );

      console.log('currentUser: ', currentUser);

      console.log(
        '여기에 등록한 함수는 사용자 정보가 바뀔 때마다 호출되는데 처음 호출될 때 곧바로 unsubscribe 해서 한번 호출된 후에는 더 이상 호출되지 않게 설정',
      );
      // 여기에 등록한 함수는 사용자 정보가 바뀔 때마다 호출되는데 처음 호출될 때 곧바로 unsubscribe 해서 한번 호출된 후에는 더 이상 호출되지 않게 설정

      console.log('unsubscribe() 호출');
      unsubscribe();

      console.log('!currentUser: ', !currentUser);
      console.groupEnd();

      if (!currentUser) {
        return;
      }

      const profile = await getUser(currentUser.uid);
      console.log('profile: ', profile);

      if (!profile) {
        return;
      }

      console.log('setUser(profile) 호출');
      setUser(profile);
    });
  }, [setUser]);
  console.log('subscribeAuth: ', subscribeAuth);
  console.groupEnd();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
