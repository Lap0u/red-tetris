import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../dto/User';
import Cookies from 'js-cookie';

const userCookie = Cookies.get('userId');
let user = null;
if (userCookie) {
  user = getUser(userCookie);
  if (!user) {
    Cookies.remove('userId');
  }
}
const initialState: { user: User | null } = {
  user: user,
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
