import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

export const authStorage = {
  async getToken() {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async setToken(token) {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async removeToken() {
    return AsyncStorage.removeItem(TOKEN_KEY);
  },
};
