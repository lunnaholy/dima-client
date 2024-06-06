import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notifications/reducer";
import userReducer from "./user/reducer";

const rootStore = configureStore({
  reducer: {
    notifications: notificationReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
export default rootStore;