import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from "./types";

// TODO: грузить нотифы с бэкенда или хранить их в IndexedDB
interface NotificationsState {
  notifications: INotification[];
}

const initialState: NotificationsState = {
  notifications: []
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;