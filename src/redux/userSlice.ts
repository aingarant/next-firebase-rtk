import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
}

interface User {
  id: string
  email?: string
  displayName?: string
  photoURL?: string

}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
