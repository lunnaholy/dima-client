import { Link } from "react-router-dom";
import { TableBuilder } from "../../components/tables/tableBuilder";
import { OfficeLocation } from "../../../api/locations/locations";
import { FaDoorClosed } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";

export function LocationsPage() {
  const [locations, setLocations] = useState<OfficeLocation[]>([]);

  useEffect(() => {
    api.locations.list()
      .then(data => {
        setLocations(data.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке локаций!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-bold text-2xl">Локации</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены доступные вам локации.</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Название",
                key: "display_name"
              }, {
                label: "Адрес",
                key: "address"
              }, {
                label: "Город",
                key: "city"
              }, {
                label: "Станция метро",
                key: "metro_station"
              }, {
                label: "Район",
                key: "district"
              }, {
                label: "Действия",
                key: "actions",
                render(_value, row: OfficeLocation) {
                  return (
                    <div className="flex flex-row gap-2">
                      <Link to={`/dashboard/locations/${row.id}/offices`}><FaDoorClosed /></Link>
                    </div>
                  )
                },
              }
            ]}
            data={locations}
          />
        </div>
      </div>
    </>
  )
}