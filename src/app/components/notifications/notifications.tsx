import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { FaCircleInfo, FaFolderMinus, FaTrashCan } from "react-icons/fa6";
import { clearNotifications, markAsReaded } from "../../store/notifications/reducer";
import { INotification, NotificationIcon } from "../../store/notifications/types";
import { getNormalizedDate, getNormalizedTime } from "../../../utils";
import { useEffect } from "react";

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
    <div className="flex gap-2 w-full">
      <div className={`min-w-12 min-h-12 max-w-12 max-h-12 ${getNotificationBgColor(notification.icon)} flex items-center justify-center rounded-lg`}>
        {getNotificationIcon(notification.icon, getNotificationTextColor(notification.icon))}
      </div>
      <div className="flex flex-col flex-grow max-w-sm">
        <span className="font-medium">{ notification.title }</span>
        <span className="text-sm max-w-sm text-wrap">{ notification.message }</span>
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
    case NotificationIcon.DEFAULT:
      return "bg-zinc-100 dark:bg-zinc-800";
    default:
      return "bg-zinc-100 dark:bg-zinc-800";
  };
};

function getNotificationTextColor(icon: NotificationIcon) {
  switch (icon) {
    case NotificationIcon.DEFAULT:
      return "text-zinc-500 dark:text-zinc-400";
    default:
      return "text-zinc-500 dark:text-zinc-400";
  };
};

function getNotificationIcon(icon: NotificationIcon, color: string = "text-zinc-500 dark:text-zinc-400") {
  const mainClass = `text-md`;
  switch (icon) {
    case NotificationIcon.DEFAULT:
      return <FaCircleInfo className={`${mainClass} ${color}`} />;
    default:
      return <FaCircleInfo className={`${mainClass} ${color}`} />;
  };
};