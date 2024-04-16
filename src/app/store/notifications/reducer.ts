import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from "./types";

// TODO: грузить нотифы с бэкенда или хранить их в IndexedDB
interface NotificationsState {
  notifications: INotification[];
  unreadCount: number;
}

const initialState: NotificationsState = {
  notifications: [],
  unreadCount: 0
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.push(action.payload);
      state.unreadCount += 1;
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
    markAsReaded(state) {
      state.unreadCount = 0;
    }
  },
});

export const { addNotification, removeNotification, clearNotifications, markAsReaded } = notificationsSlice.actions;

export default notificationsSlice.reducer;