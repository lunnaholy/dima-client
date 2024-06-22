import React from "react";
import { api } from "../../../api";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { Renter } from "../../../api/renters/renters";

export function RenterHandbook({ register, isInvalid, errorMessage, defaultSelectedKey }: { register: UseFormRegisterReturn, isInvalid: boolean, errorMessage: string, defaultSelectedKey?: string }) {
  const [items, setItems] = React.useState<Renter[]>([]);

  React.useEffect(() => {
    api.renters.list()
    .then(items => {
      setItems(items.data);
    })
    .catch(err => {
      console.error(err);
      toast.error("Произошла ошибка при загрузке справочника арендаторов!");
    });
  }, []);

  return (
    <Autocomplete
      {...register}
      defaultItems={items}
      label="Арендатор" 
      placeholder="Выберите арендатора"
      variant="bordered"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      defaultSelectedKey={defaultSelectedKey}
    >
      {(item) =>
        <AutocompleteItem key={String(item.id)}>{`${item.display_name}`}</AutocompleteItem>
      }
    </Autocomplete>
  )
}