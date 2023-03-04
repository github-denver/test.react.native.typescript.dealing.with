import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {useUserContext} from '../contexts/UserContext';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState();
  const {setUser} = useUserContext();

  const createChangeTextHandHandler = name => {
    return value => {
      setForm({...form, [name]: value});
    };
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    console.log('form: ', form);

    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않아요.');
      console.log({password, confirmPassword});

      return;
    }

    const info = {email, password};
    console.log('info: ', info);

    setLoading(true);

    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      console.log('user: ', user);
      console.log('user.uid: ', user.uid);

      const profile = await getUser(user.uid);
      console.log('profile: ', profile);

      if (!profile) {
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        console.log('프로필이 존재하는 계정이기 때문에 setUser를 호출합니다.');

        setUser(profile);
      }
    } catch (error) {
      console.error(error);
      console.log('error.code: ', error.code);

      const message = {
        'auth/email-already-in-use': '이미 가입된 이메일이에요.',
        'auth/wrong-password': '잘못된 비밀번호에요.',
        'auth/user-not-found': '존재하지 않는 이메일이에요.',
        'auth/invalid-email': '유효하지 않은 이메일 주소에요.',
        'auth/weak-password': '암호는 6자 이상이어야 해요',
      };

      console.log(`error message: ${message[error.code]}`);

      const msg = message[error.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      console.log('msg: ', msg);

      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandHandler={createChangeTextHandHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
