import { useCallback, useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { FaMapLocationDot } from "react-icons/fa6";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { OfficeLocation } from "../../../api/locations/locations";
import { setLocation } from "../../store/location/reducer";

export function SelectLocation() {
  const dispatch = useAppDispatch();
  const [locations, setLocations] = useState<OfficeLocation[] | null>(null);

  useEffect(() => {
    api.locations.list()
      .then(response => {
        setLocations(response.data)
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке локаций!");
      });
  }, [setLocations]);

  const selectLocation = useCallback((location: OfficeLocation) => {
    localStorage.setItem("locationId", location.id.toString());
    localStorage.setItem("locationCachedDisplayName", location.display_name);
    dispatch(setLocation({ id: location.id, display_name: location.display_name }));
    window.location.href = "/dashboard/";
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-row justify-between w-full items-center mb-4">
          <span className="text-2xl font-bold">Выбор локации</span>
        </div>
        <span className="text-sm max-w-96">
          Вам необходимо выбрать желаемую локацию. Ваш выбор будет сохранён в рамках этого браузера и Вы сможете в любой момент выйти из выбранной ранее локации и зайти в другую.
        </span>
        <span className="text-sm max-w-96 font-medium">
          Ваши локации:
        </span>
        <div className="flex flex-row flex-wrap gap-2 max-w-[1000px] mt-2">
          {locations && locations.length > 0 && (
            <>
              {locations.map((location, index) => (
                <div className="flex flex-col bg-background border-2 border-default-200 rounded-xl cursor-pointer select-none" onClick={() => selectLocation(location)} key={index}>
                  <div className="flex flex-col gap-3 p-4">
                    <span className="text-medium font-bold">{location.display_name}</span>
                    <div className="flex flex-row gap-2 items-center">
                      <FaMapLocationDot />
                      <span className="text-sm font-medium">{location.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {!locations || locations.length == 0 && (
            <span>Похоже, у вас нет доступных локаций.</span>
          )}
        </div>
      </div>
    </>
  )
}