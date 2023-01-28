import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'todos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);
      console.log('rawTodos: ', rawTodos);

      if (!rawTodos) {
        // 저장된 데이터가 없으면 사용하지 않습니다.
        throw new Error('No saved todos');
      }

      const savedTodos = JSON.parse(rawTodos);
      console.log('savedTodos: ', savedTodos);

      return savedTodos;
    } catch (error) {
      throw new Error('Failed to load todos');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error('Failed to save todos');
    }
  },
};

export default todosStorage;
