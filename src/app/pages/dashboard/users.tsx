import { TableBuilder } from "../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { User } from "../../../api/auth/auth";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.users.list()
      .then(data => {
        setUsers(data.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке пользователей!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-bold text-2xl">Пользователи</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены все пользователи, связанные с Вами..</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Имя пользователя",
                key: "username"
              }, {
                label: "ФИО",
                key: "names",
                render(_value, row: User) {
                  return (<span>{row.first_name}{row.middle_name ? ` ${row.middle_name} ` : ''}{row.last_name}</span>)
                },
              }, {
                label: "Роль",
                key: "role",
              }, {
                label: "phone_number",
                key: "Номер телефона"
              }, {
                label: "Telegram",
                key: "telegram",
                render(value, _row) {
                  return (<span>{value !== 0 ? "Привязан" : "Не привязан"}</span>)
                },
              }, {
                label: "Действия",
                key: "actions",
                render(_value, _row: User) {
                  return (
                    <div className="flex flex-row gap-2">
                      
                    </div>
                  )
                },
              }
            ]}
            data={users}
          />
        </div>
      </div>
    </>
  )
}