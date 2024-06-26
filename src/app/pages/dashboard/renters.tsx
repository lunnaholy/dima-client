import { ColumnType, TableBuilder } from "../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { Renter } from "../../../api/renters/renters";
import { UserChip } from "../../components/chips/userChip";

export function RentersPage() {
  const [renters, setRenters] = useState<Renter[]>([]);

  useEffect(() => {
    api.renters.list()
      .then(data => {
        setRenters(data.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке арендаторов!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Арендаторы</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены все арендаторы, связанные с Вами.</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Название",
                key: "display_name",
                type: ColumnType.String
              }, {
                label: "ОРГН",
                key: "orgn",
                type: ColumnType.String
              }, {
                label: "Номер телефона",
                key: "phone_number",
                type: ColumnType.String
              }, {
                label: "Адрес почты",
                key: "email",
                type: ColumnType.String
              }, {
                label: "Владелец",
                key: "holder",
                type: ColumnType.User
              }
            ]}
            data={renters}
          />
        </div>
      </div>
    </>
  )
}