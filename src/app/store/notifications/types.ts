export enum NotificationIcon {
  DEFAULT = "default"
}

export interface INotification {
  id: number;
  icon: NotificationIcon;
  title: string;
  message: string;
  datetime: string;
}