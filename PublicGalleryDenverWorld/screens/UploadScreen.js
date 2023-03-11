import storage from '@react-native-firebase/storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';
import events from '../lib/events';

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();

  const animation = useRef(new Animated.Value(width)).current;

  const [isKeyBoardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  const {user} = useUserContext();

  const onSubmit = useCallback(async () => {
    navigation.pop();

    const asset = res.assets[0];
    const extension = asset.fileName.split('.').pop();
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);

    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }

    const photoURL = await reference.getDownloadURL();

    await createPost({description, photoURL, user});

    // 포스트 목록 새로고침
    events.emit('refresh');
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });

    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyBoardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyBoardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 180})}>
      <View style={styles.block}>
        <Animated.Image
          source={{uri: res.assets[0]?.uri}}
          style={[styles.image, {height: animation}]}
          resizeMode="cover"
        />
        <TextInput
          style={styles.input}
          multiline
          placeholder="이 사진의 설명을 입력할 수 있어요."
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  image: {width: '100%'},
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
