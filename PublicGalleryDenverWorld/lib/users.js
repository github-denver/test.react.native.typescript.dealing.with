import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id) {
  console.group('export async function getUser(id) { .. }');
  console.log('id: ', id);

  const doc = await usersCollection.doc(id).get();
  console.log('doc: ', doc);
  console.groupEnd();

  return doc.data();
}
