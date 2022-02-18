import { createSlice } from '@reduxjs/toolkit';

const userName = localStorage.getItem('userName');

const loginSlice = createSlice({
  name: 'loginUser',
  initialState: {
    userName: userName?.trim().length > 0 ? userName : '',
  },
  reducers: {
    login(state, action) {
      return {
        userName: action.payload,
      };
    },
    logout(state, action) {
      return {
        userName: '',
      };
    },
  },
});

const { actions, reducer } = loginSlice;
export const { login, logout } = actions;
export default reducer;
