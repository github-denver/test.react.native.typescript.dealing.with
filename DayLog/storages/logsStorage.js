import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'logs';

const logsStorage = {
  async get() {
    try {
      const raw = await AsyncStorage.getItem(key);
      const parsed = JSON.parse(raw);

      return parsed;
    } catch (error) {
      throw new Error('Failed to load logs');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error('Failed to save logs');
    }
  },
};

export default logsStorage;
