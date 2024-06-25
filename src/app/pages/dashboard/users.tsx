import { ColumnType, TableBuilder } from "../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { User } from "../../../api/auth/auth";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { Button, useDisclosure } from "@nextui-org/react";
import { CreateUserModal } from "../../components/modals/users/createUserModal";
import { UpdateUserModal } from "../../components/modals/users/updateUserModal";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const createUserModalDisclosure = useDisclosure();
  const editUserModalDisclosure = useDisclosure();

  const editUser = (user: User) => {
    setUser(user);
    editUserModalDisclosure.onOpen();
  };

  useEffect(() => {
    api.users.list()
      .then(data => {
        setUsers(data.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке пользователей!");
      });
  }, [
    createUserModalDisclosure.isOpen,
    editUserModalDisclosure.isOpen
  ]);

  return (
    <>
      <CreateUserModal disclosure={createUserModalDisclosure} />
      <UpdateUserModal disclosure={editUserModalDisclosure} user={user} />
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-bold text-2xl">Пользователи</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены все пользователи, связанные с Вами.</span>
        </div>
        <div className="flex flex-row gap-4 items-center mb-2">
          <Button
            startContent={<FaPlus />}
            color="primary"
            variant="solid"
            className="max-w-fit"
            onClick={() => createUserModalDisclosure.onOpen()}
          >
            Создать пользователя
          </Button>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Имя пользователя",
                key: "username",
                type: ColumnType.String
              }, {
                label: "ФИО",
                key: "names",
                type: ColumnType.Custom,
                render(_value, row: User) {
                  return (<span>{row.first_name}{row.middle_name ? ` ${row.middle_name} ` : ''}{row.last_name}</span>)
                },
              }, {
                label: "Роль",
                key: "role",
                type: ColumnType.String
              }, {
                label: "Номер телефона",
                key: "phone_number",
                type: ColumnType.String
              }, {
                label: "Telegram",
                key: "telegram",
                type: ColumnType.Custom,
                render(value, _row) {
                  return (<span>{value !== 0 ? "Привязан" : "Не привязан"}</span>)
                },
              }, {
                label: "Действия",
                key: "actions",
                type: ColumnType.Custom,
                render(_value, row: User) {
                  return (
                    <div className="flex flex-row gap-2">
                      <FaPencil className="cursor-pointer" onClick={() => editUser(row)} />
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