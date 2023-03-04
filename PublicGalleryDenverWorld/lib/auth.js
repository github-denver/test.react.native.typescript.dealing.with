import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
  console.group('export function subscribeAuth(callback) { .. }');
  console.log('callback: ', callback);
  console.groupEnd();

  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  return auth().signOut();
}
