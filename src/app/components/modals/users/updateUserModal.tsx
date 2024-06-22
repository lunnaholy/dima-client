import { useDisclosure } from "@nextui-org/react";
import { FormModalBuilder, InputField } from "../formModalBuilder";
import { api } from "../../../../api";
import { User } from "../../../../api/auth/auth";
import { toast } from "react-toastify";

const fields: InputField[] = [
  {
    label: "Имя пользователя",
    name: "username",
    placeholder: "Логин",
    type: "text"
  }, {
    label: "Имя",
    name: "first_name",
    placeholder: "Виктор",
    type: "text"
  }, {
    label: "Фамилия",
    name: "last_name",
    placeholder: "Логинов",
    type: "text"
  }, {
    label: "Отчество",
    name: "middle_name",
    placeholder: "Геннадьевич",
    type: "text"
  }, {
    label: "Роль",
    name: "role",
    placeholder: "0",
    type: "text"
  }, {
    label: "Арендатор",
    name: "renter",
    placeholder: "0",
    type: "text"
  }, {
    label: "Номер телефона",
    name: "phone_number",
    placeholder: "+7999...",
    type: "text"
  }, {
    label: "Пароль",
    name: "password",
    placeholder: "Логин",
    type: "text"
  },
]

interface IUpdateUserData {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
  renter: string;
  phone_number: string;
  password: string;
}

export function UpdateUserModal({ disclosure, user }: { disclosure: ReturnType<typeof useDisclosure>, user: User | null }) {
  const onSubmit = async (data: IUpdateUserData) => {
    api.users.update(user!.id, {
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      password: data.password,
      phone_number: data.phone_number,
      renter: Number(data.renter),
      role: Number(data.role),
      username: data.username,
    })
      .then(_data => {
        toast.success("Пользователь успешно обновлён!");
        disclosure.onClose();
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при обновлении пользователя!");
      })
  }

  const onDelete = () => {
    api.users.delete(user!.id)
      .then(_data => {
        toast.success("Пользователь успешно удалён!");
        disclosure.onClose();
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при удалении пользователя!");
      })
  }

  return (
    <FormModalBuilder
      title="Редактирование пользователя"
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
      onSubmit={onSubmit}
      fields={fields}
      submitButtonText="Сохранить"
      displayDeleteButton={true}
      onDelete={onDelete}
      defaultValues={{
        username: user!.username,
        first_name: user!.first_name,
        last_name: user!.last_name,
        middle_name: user!.middle_name,
        role: String(user!.role),
        renter: String(user!.renter),
        phone_number: user!.phone_number
      }}
    />
  )
}