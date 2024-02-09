import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../dto/User';

const initialState: { user: User | null } = {
  user: null,
};

// Step 3: Define the slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
