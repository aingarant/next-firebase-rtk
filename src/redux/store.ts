import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/services/user";
import { groupsApi } from "@/services/group";
import { membersApi } from "@/services/member";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      membersApi.middleware,
      groupsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
