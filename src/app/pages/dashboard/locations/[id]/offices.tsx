import { useParams } from "react-router-dom";
import { TableBuilder } from "../../../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../../../api";
import { toast } from "react-toastify";
import { Office } from "../../../../../api/officies/officies";

export function LocationOfficesPage() {
  const { id } = useParams() as { id: string };
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    api.officies.list()
      .then(data => {
        setOffices(data.data.filter(row => row.location === Number(id)));
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке офисов!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-bold text-2xl">Офисы</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены доступные офисы в выбранной ранее локации.</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Название",
                key: "display_name"
              }, {
                label: "Тип офиса",
                key: "office_type"
              }, {
                label: "Площадь",
                key: "area"
              }, {
                label: "Цена",
                key: "price"
              }, {
                label: "Кол-во комнат",
                key: "room_count"
              }, {
                label: "Локация",
                key: "location"
              }, {
                label: "Этаж",
                key: "floor"
              }
            ]}
            data={offices}
          />
        </div>
      </div>
    </>
  )
}