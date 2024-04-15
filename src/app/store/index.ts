import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notifications/reducer";

const rootStore = configureStore({
  reducer: {
    notifications: notificationReducer
  }
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;
export default rootStore;