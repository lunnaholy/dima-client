import { Button } from "@nextui-org/react";
import { Column, ColumnType, TableBuilder } from "../../components/tables/tableBuilder";
import { addNotification } from "../../store/notifications/reducer";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { NotificationAction, NotificationIcon } from "../../store/notifications/types";

export function TestPage() {
  const dispatch = useAppDispatch();

  const createNotification = () => {
    dispatch(addNotification({
      id: Math.floor(Math.random() * 10000),
      datetime: new Date().toISOString(),
      title: "Hello, world!",
      message: "В рендер-движке можно будет прописать уведомления с кнопками, при нажатии на которые будет выполняться какое-то действие",
      icon: NotificationIcon.DISLIKE,
      payload: {
        action: NotificationAction.OPEN_PAGE,
        text: "Открыть",
        url: "https://vk.com/bebra"
      }
    }));
  };

  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      type: ColumnType.Number
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      type: ColumnType.String
    },
    {
      key: "age",
      label: "Age",
      sortable: true,
      type: ColumnType.Number
    }
  ];

  const items = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 22 },
    { id: 3, name: "Doe", age: 30 }
  ];

  return (
    <>
      <TableBuilder
        columns={columns}
        data={items}
        rowsPerPage={10}
        />
      {/* <NotificationsList /> */}
      <Button onClick={createNotification}>Add notification</Button>
    </>
  )
}