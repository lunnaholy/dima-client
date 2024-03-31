import { useEffect, useState } from "react";
import { Lock } from "../../components/lock/lock";
import { Printer } from "../../components/printer/printer";
import { set } from "react-hook-form";
import { FaFile, FaHandPointer } from "react-icons/fa6";
import { Button } from "@nextui-org/react";

// TODO: перенести селектор файлов в отдельный компонент (и оживить его)

export function PrintPage() {
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);

  const printers: Printer[] = [
    { id: 1, status: true, displayName: "Принтер 1" },
    { id: 2, status: false, displayName: "Принтер 2" },
    { id: 3, status: true, displayName: "Принтер 3" },
    { id: 4, status: true, displayName: "Принтер 4" },
    { id: 5, status: false, displayName: "Принтер 5" },
    { id: 6, status: true, displayName: "Принтер 6" }
  ];

  useEffect(() => {
    setSelectedPrinter(printers[0]);
  }, []);

  const selectPrinter = (printer: Printer) => {
    if(printer.status == false) return;
    setSelectedPrinter(printer);
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Печать</span>
        <span className="text-sm max-w-96">
          Отправьте документ на печать на общем принтере в Вашем пространстве.
        </span>
        <div className="flex flex-row flex-wrap gap-2 max-w-[720px] p-2 mt-2">
          {printers.map((printer) => (
            <Printer key={printer.id} printer={printer} setPrinter={selectPrinter} isActive={printer.id == selectedPrinter?.id} />
          ))}
        </div>
        <span className="text-base">Вы выбрали {selectedPrinter?.displayName}</span>
        <div className="select-none cursor-pointer flex flex-col gap-4 max-w-[320px] mt-2 border-2 border-dashed border-primary border-opacity-50 bg-background rounded-xl items-center px-4 py-8">
          <div className="flex flex-col gap-4 items-center">
            <FaFile />
            <span className="text-sm">Перетащите файл</span>
          </div>
          <div className="flex flex-row gap-8 p-2 items-center w-full">
            <div className="block w-full border-solid border-b-1 border-default"></div>
            <span className="text-sm">или</span>
            <div className="block w-full border-solid border-b-1 border-default"></div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <FaHandPointer />
            <span className="text-sm">Нажмите, чтобы выбрать файл</span>
          </div>
        </div>
        <div className="mt-2">
          <Button color="primary">Отправить на печать</Button>
        </div>
      </div>
    </>
  )
}