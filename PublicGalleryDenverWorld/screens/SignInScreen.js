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
import {signIn, signUp} from '../lib/auth';

function SignInScreen({route}) {
  const {isSignUp} = route.params ?? {};

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState();

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
    }

    const info = {email, password};
    console.log('info: ', info);

    setLoading(true);

    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      console.log('user: ', user);
    } catch (error) {
      const message = {
        'auth/email-already-in-use': '이미 가입된 이메일이에요.',
        'auth/wrong-password': '잘못된 비밀번호에요.',
        'auth/user-not-found': '존재하지 않는 이메일이에요.',
        'auth/invalid-email': '유효하지 않은 이메일 주소에요.',
      };

      const msg = message[error.code] || `${isSignUp ? '가입' : '로그인'} 실패`;

      Alert.alert('실패', msg);
      console.error(msg);
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
