import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ActionSheetIOS, Platform} from 'react-native';
import events from '../lib/events';
import {removePost} from '../lib/posts';

export default function usePostActions({id, description}) {
  const [isSelecting, setIsSelecting] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const edit = () => {
    navigation.navigate('Modify', {
      id,
      description,
    });
  };

  const remove = async () => {
    await removePost(id);

    // 단일 포스트 조회화면이라면 뒤로 가기
    if (route.name === 'Post') {
      navigation.pop();
    }

    // 홈 및 프로필 화면의 목록 업데이트
    events.emit('removePost', id);
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['수정', '삭제', '취소'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 2,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            edit();
          } else {
            if (buttonIndex === 1) {
              remove();
            }
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {
    isSelecting,
    onPressMore,
    onClose,
    actions,
  };
}
