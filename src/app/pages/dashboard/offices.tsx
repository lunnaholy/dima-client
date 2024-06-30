import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { api } from "../../../api";
import { Office } from "../../../api/officies/officies";
import { ColumnType, TableBuilder } from "../../components/tables/tableBuilder";
import { Checkbox } from "@nextui-org/react";

export function OfficesPage() {
  const [offices, setOffices] = useState<Office[]>([]);

  const [filterByLocation, setFilterByLocation] = useState<boolean>(true);

  useEffect(() => {
    api.officies.list()
      .then(async response => {
        if (!filterByLocation) return setOffices(response.data);
        const data: Office[] = [];
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          if (element.location == Number(localStorage.getItem("locationId"))) {
            data.push(element);
          }
        }

        setOffices(data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке офисов!");
      });
  }, [
    filterByLocation
  ]);

  const openLock = useCallback((id: number) => {
    api.locks.unlock(id)
      .then(data => {
        console.log(data);
        toast.success("Замок был успешно открыт!");
      })
      .catch(err => {
        console.log(err);
        toast.error("При открытии замка произошла ошибка!");
      });
  }, []);

  const closeLock = useCallback((id: number) => {
    api.locks.lock(id)
      .then(data => {
        console.log(data);
        toast.success("Замок был успешно закрыт!");
      })
      .catch(err => {
        console.log(err);
        toast.error("При закрытии замка произошла ошибка!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-2xl">Офисы</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены доступные офисы в выбранной ранее локации.</span>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => { setFilterByLocation(e.target.checked) }} defaultChecked>Фильтрация по локации</Checkbox>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Название",
                key: "display_name",
                type: ColumnType.String
              }, {
                label: "Тип офиса",
                key: "office_type",
                type: ColumnType.String
              }, {
                label: "Площадь",
                key: "area",
                type: ColumnType.Number
              }, {
                label: "Цена",
                key: "price",
                type: ColumnType.Number
              }, {
                label: "Кол-во комнат",
                key: "room_count",
                type: ColumnType.Number
              }, {
                label: "Локация",
                key: "location",
                type: ColumnType.String
              }, {
                label: "Этаж",
                key: "floor",
                type: ColumnType.Number
              }, {
                label: "Действия",
                key: "action",
                type: ColumnType.Custom,
                render(_value: any, row: Office) {
                  <div className="flex flex-row gap-2">
                    <span onClick={() => openLock(row.id)} className="cursor-pointer"><FaLockOpen /></span>
                    <span onClick={() => closeLock(row.id)} className="cursor-pointer"><FaLock /></span>
                  </div>
                },
              }
            ]}
            data={offices}
          />
        </div>
      </div>
    </>
  )
}