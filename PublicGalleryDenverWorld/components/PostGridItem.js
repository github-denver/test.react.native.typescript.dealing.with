import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

function PostGridItem({post}) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 2) / 3;
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Post', {post});
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
        styles.block,
      ]}>
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 1,
    marginLeft: 1,
  },
  image: {
    backgroundColor: '#dbdbdb',
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
