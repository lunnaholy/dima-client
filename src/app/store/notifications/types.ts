export enum NotificationIcon {
  DEFAULT = "default",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
  LIKE = "like",
  DISLIKE = "dislike"
}

export enum NotificationAction {
  NONE = "none",
  OPEN_PAGE = "open_page"
}

export interface DefaultAction {
  action: NotificationAction;
  text: string;
}

export interface OpenPageAction extends DefaultAction {
  action: NotificationAction.OPEN_PAGE;
  url: string;
};

export type NotificationPayload = DefaultAction | OpenPageAction;

export interface INotification {
  id: number;
  icon: NotificationIcon;
  title: string;
  message: string;
  datetime: string;
  payload: NotificationPayload;
}