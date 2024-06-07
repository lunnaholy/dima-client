import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FaCircleExclamation, FaCircleInfo, FaFolderMinus, FaThumbsDown, FaThumbsUp, FaTrashCan, FaTriangleExclamation } from "react-icons/fa6";
import { clearNotifications, markAsReaded } from "../../store/notifications/reducer";
import { INotification, NotificationAction, NotificationIcon, NotificationPayload, OpenPageAction } from "../../store/notifications/types";
import { getNormalizedDate, getNormalizedTime } from "../../../utils";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function isOpenPageAction(payload: NotificationPayload): payload is OpenPageAction {
  return payload.action === NotificationAction.OPEN_PAGE;
}

export function NotificationsList() {
  const dispatch = useAppDispatch(); 
  const notifications = useAppSelector(state => state.notifications.notifications);

  useEffect(() => {
    dispatch(markAsReaded());
  }, []);

  return (
    <div className="max-w-sm w-full">
      <div className="flex justify-between items-center pl-4 pt-4 pr-4">
        <span className="text-xl font-bold select-none">Уведомления</span>
        <span className="text-zinc-500 cursor-pointer" onClick={() => dispatch(clearNotifications())}>
          <FaTrashCan />
        </span>
      </div>
      <div className="mt-4 flex flex-col w-full gap-4 max-h-[40vh] overflow-auto p-4 mb-4">
        {notifications.length === 0 && (
          <div className="h-64 flex flex-col gap-8 items-center justify-center">
            <span className="text-zinc-500 text-3xl">
              <FaFolderMinus />
            </span>
            <span className="text-zinc-500">Ничего нет :(</span>
          </div>
        )}
        {notifications.map(notification => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

function Notification({ notification }: { notification: INotification }) {
  return (
    <div className="flex gap-3 w-full">
      <div className={`min-w-10 min-h-10 max-w-10 max-h-10 ${getNotificationBgColor(notification.icon)} flex items-center justify-center rounded-lg`}>
        {getNotificationIcon(notification.icon, getNotificationTextColor(notification.icon))}
      </div>
      <div className="flex flex-col flex-grow max-w-sm">
        <span className="font-medium">{ notification.title }</span>
        <span className="text-sm max-w-sm text-wrap">{ notification.message }</span>
        {isOpenPageAction(notification.payload) && (
          <Button className="mt-2" size="sm" as={Link} to={notification.payload.url}>{ notification.payload.text }</Button>
        )}
      </div>
      <div className="flex flex-col items-end">
        <span className="font-medium">{ getNormalizedTime(notification.datetime) }</span>
        <span className="text-sm">{ getNormalizedDate(notification.datetime) }</span>
      </div>
    </div>
  );
};

function getNotificationBgColor(icon: NotificationIcon) {
  switch (icon) {
    case NotificationIcon.INFO:
      return "bg-primary-300 dark:bg-primary-100";
    case NotificationIcon.WARNING:
      return "bg-yellow-300 dark:bg-yellow-800";
    case NotificationIcon.DANGER:
      return "bg-red-300 dark:bg-red-900";
    case NotificationIcon.LIKE:
      return "bg-green-300 dark:bg-green-900";
    case NotificationIcon.DISLIKE:
      return "bg-neutral-300 dark:bg-neutral-800";
    case NotificationIcon.DEFAULT: 
    default:
      return "bg-zinc-100 dark:bg-zinc-800";
  };
};

function getNotificationTextColor(icon: NotificationIcon) {
  switch (icon) {
    case NotificationIcon.INFO:
      return "text-primary-700 dark:text-primary-300";
    case NotificationIcon.WARNING:
      return "text-yellow-700 dark:text-yellow-300";
    case NotificationIcon.DANGER:
      return "text-red-600 dark:text-red-400";
    case NotificationIcon.LIKE:
      return "text-green-700 dark:text-green-400";
    case NotificationIcon.DISLIKE:
      return "text-neutral-700 dark:text-neutral-300";
    case NotificationIcon.DEFAULT:
    default:
      return "text-zinc-500 dark:text-zinc-400";
  };
};

function getNotificationIcon(icon: NotificationIcon, color: string = "text-zinc-500 dark:text-zinc-400") {
  const mainClass = `text-md`;
  switch (icon) {
    case NotificationIcon.WARNING:
      return <FaTriangleExclamation className={`${mainClass} ${color}`} />;
    case NotificationIcon.DANGER:
      return <FaCircleExclamation className={`${mainClass} ${color}`} />;
    case NotificationIcon.LIKE:
      return <FaThumbsUp className={`${mainClass} ${color}`} />;
    case NotificationIcon.DISLIKE:
      return <FaThumbsDown className={`${mainClass} ${color}`} />;  
    case NotificationIcon.INFO:
    case NotificationIcon.DEFAULT:
    default:
      return <FaCircleInfo className={`${mainClass} ${color}`} />;
  };
};