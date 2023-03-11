import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';

function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
