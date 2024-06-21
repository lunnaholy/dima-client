import { useDisclosure } from "@nextui-org/react";
import { FormModalBuilder, InputField } from "../formModalBuilder";
import { api } from "../../../../api";

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

interface ICreateUserData {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: string;
  renter: string;
  phone_number: string;
  password: string;
}

export function CreateUserModal({ disclosure }: { disclosure: ReturnType<typeof useDisclosure> }) {
  const onSubmit = async (data: ICreateUserData) => {
    api.users.create({
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      password: data.password,
      phone_number: data.phone_number,
      renter: Number(data.renter),
      role: Number(data.role),
      username: data.username,
    })
  }

  return (
    <FormModalBuilder
      title="Создание пользователя"
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
      onSubmit={onSubmit}
      fields={fields}
      submitButtonText="Создать"
    />
  )
}