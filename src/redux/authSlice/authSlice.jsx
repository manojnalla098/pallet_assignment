import { createSlice } from '@reduxjs/toolkit';
// import { setItem, getItem, removeItem } from '../../storage/mmkv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  //   token: getItem('token') || null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action) {
      state.token = action.payload;
      state.loading = true;
      AsyncStorage.setItem('token', JSON.stringify(action.payload));
    },

    logout: state => {
      state.token = null;
      AsyncStorage.setItem('token', JSON.stringify(null));
      //   removeItem('token');
    },
  },
});

export const { loginStart, logout } = authSlice.actions;
export default authSlice.reducer;
