import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { UseFormRegisterReturn } from "react-hook-form";

export function UserRoleHandbook({ register, isInvalid, errorMessage, defaultSelectedKey }: { register: UseFormRegisterReturn, isInvalid: boolean, errorMessage: string, defaultSelectedKey?: string }) {
  const [roles, setRoles] = React.useState<{ display_name: string; id: number }[]>([]);

  React.useEffect(() => {
    setRoles([
      {
        "display_name": "Представитель арендатора",
        "id": 1
      },
      {
        "display_name": "Сотрудник",
        "id": 2
      },
      {
        "display_name": "Арендатор",
        "id": 3
      }
    ])
  }, []);

  return (
    <Autocomplete
      {...register}
      defaultItems={roles}
      label="Роль"
      placeholder="Выберите роль"
      variant="bordered"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      defaultSelectedKey={defaultSelectedKey}
    >
      {(item) =>
        <AutocompleteItem key={String(item.id)}>{`${item.id} - ${item.display_name}`}</AutocompleteItem>
      }
    </Autocomplete>
  )
}