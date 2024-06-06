import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../api/auth/auth';

interface UserState {
  currentUser: Partial<User>
}

const initialState: UserState = {
  currentUser: {
    first_name: "Not",
    last_name: "Loaded",
    middle_name: "Yet"
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;