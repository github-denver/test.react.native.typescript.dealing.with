import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import events from '../lib/events';
import {updatePost} from '../lib/posts';

function ModifyScreen() {
  const navigation = useNavigation();
  const {params} = useRoute();

  // 라우트 파라미터의 description을 초깃값으로 사용
  const [description, setDescription] = useState(params.description);

  const onSubmit = useCallback(async () => {
    // 포스트 수정
    await updatePost({
      id: params.id,
      description,
    });

    events.emit('updatePost', {
      postId: params.id,
      description,
    });

    // 포스트 및 포스트 목록 업데이트
    navigation.pop();
  }, [navigation, params.id, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="check" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 88,
      })}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="이 사진의 설명을 입력할 수 있어요."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default ModifyScreen;
