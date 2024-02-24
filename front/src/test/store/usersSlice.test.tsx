import { describe, it, expect } from 'vitest';
import { User } from '../../dto/User';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { clearUser, setUser } from '../../store/usersSlice';

describe('userSlice', () => {
  const initialState = { user: null };
  const store = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  it('should handle initial state', () => {
    expect(store.getState().users).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const exampleUser: User = { id: 1, username: 'testUser' };
    store.dispatch(setUser(exampleUser));
    expect(store.getState().users.user).toEqual(exampleUser);
  });

  it('should handle clearUser', () => {
    // Starting with a state that has a user set
    const startingState = { user: { id: 1, username: 'testUser' } };
    store.dispatch(setUser(startingState.user));
    expect(store.getState().users.user).toEqual(startingState.user);
    store.dispatch(clearUser());
    expect(store.getState().users.user).toEqual(null);
  });
});
