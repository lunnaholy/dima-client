import { Button, Spinner } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { FaLock } from "react-icons/fa6";

// TODO: перенести Lock в API (как будет готово)
export interface Lock {
  id: number;
  displayName: string;
}

export function Lock({ lock }: { lock: Lock }) {
  const [isOpening, setIsOpening] = useState(false);

  const openLock = useCallback(() => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 3000);
  }, []);

  return (
    <div onClick={openLock} className="select-none min-w-40 flex flex-col gap-2 px-4 py-3 border-solid bg-background border-2 border-foreground rounded-xl border-opacity-10 cursor-pointer">
      <span className="text-sm">{lock.displayName}</span>
      <div className="flex flex-row gap-2">
        {!isOpening && (
          <span className="cursor-pointer text-primary-500">   
            <FaLock />
          </span>
        )}
        {isOpening && (
          <Spinner size="sm" color="primary" />
        )}
      </div>
    </div>
  )
}