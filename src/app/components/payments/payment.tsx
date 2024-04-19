import { FaClock, FaCheck } from "react-icons/fa6";
import { getNormalizedDate } from "../../../utils";
import { PaymentInfoModal } from "../modals/payments/payment";
import { useDisclosure } from "@nextui-org/react";

export function Payment({ amount, date, title, status }: { amount: number, date: string, title: string, status: string }) {
  const disclosure = useDisclosure();

  return (
    <>
      <PaymentInfoModal onOpenChange={disclosure.onOpenChange} isOpen={disclosure.isOpen} />
      <div className="flex flex-col gap-3 p-4 bg-background border-2 border-zinc-700 border-opacity-20 rounded-lg select-none cursor-pointer" onClick={disclosure.onOpen}>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm font-semibold">{amount.toLocaleString("ru")}Р</span>
          <span className="text-sm text-opacity-60">{getNormalizedDate(date)}</span>
        </div>
        <span className="text-sm font-medium">{ title }</span>
        <span className="text-sm font-semibold flex flex-row gap-2 items-center">
          {status == "pending" && (
            <>
              <span className="text-zinc-600 text-sm">Ожидание</span>
              <FaClock className="text-zinc-600 text-sm" />
            </>
          )}
          {status == "success" && (
            <>
              <span className="text-primary text-sm">Завершён</span>
              <FaCheck className="text-primary text-sm" />
            </>
          )}
        </span>
      </div>
    </>
  )
}