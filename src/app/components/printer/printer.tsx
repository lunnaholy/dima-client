import { FaCheck, FaX } from "react-icons/fa6";

export interface Printer {
  id: number;
  status: boolean;
  displayName: string;
}

export function Printer({ printer, setPrinter, isActive }: { printer: Printer, setPrinter: (printer: Printer) => void, isActive: boolean }) {
  return (
    <div onClick={() => setPrinter(printer)} className={`select-none min-w-40 flex flex-col gap-2 px-4 py-3 border-solid bg-background border-2 rounded-xl border-opacity-10 cursor-pointer ${!isActive ? 'border-foreground' : 'border-primary border-opacity-100'}`}>
      <span>{printer.displayName}</span>
      <div className="flex flex-row gap-2 items-center">
        {!printer.status && (
          <>
          <span className="text-default">
            <FaX />
          </span>
          <span className="text-default">
            Не в сети
          </span>
        </>  
        )}
        {printer.status && (
          <>
            <span className={isActive ? "text-primary" : "text-foreground"}>
              <FaCheck />
            </span>
            <span className={isActive ? "text-primary" : "text-foreground"}>
              В сети
            </span>
          </>
        )}
      </div>
    </div>
  )
}