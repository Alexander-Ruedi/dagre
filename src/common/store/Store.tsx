import { configureStore } from "@reduxjs/toolkit";
import { ReducerMapModel } from "./models/ReducerMapModel";
import settingsReducer from "./slices/SettingsSlice";

const reducer: ReducerMapModel = {
  settings: settingsReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
