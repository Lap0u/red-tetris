import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import gridColorReducer from './gridColorSlice';

const store = configureStore({
  reducer: {
    //   posts: postsReducer,
    //   comments: commentsReducer,
    users: usersReducer,
    gridColor: gridColorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
