import { Button } from "@nextui-org/react";
import { getNormalizedDate } from "../../../utils";
import { FaCheck, FaClock } from "react-icons/fa6";

export function PaymentPage() {
  return (
    <div className="flex flex-col gap-2 p-2 md:p-4">
      <span className="text-2xl font-bold">Платежи</span>
      <span className="text-sm max-w-96">
        В этом разделе Вы можете увидеть совершённые Вами платежи.
      </span>
      <Button color="primary" className="max-w-fit">Новый платеж</Button>
      <div className="flex flex-row flex-wrap max-w-[720px] gap-3 p-4">
        <Payment amount={100000} date={"2022-01-01T00:00:00"} title="Оплата аренды" status="success" />
        <Payment amount={50000} date={"2022-01-01T00:00:00"} title="Оплата аренды" status="pending" />
        <Payment amount={1100} date={"2022-01-01T00:00:00"} title="Переговорка" status="success" />
        <Payment amount={100000} date={"2022-01-01T00:00:00"} title="Оплата аренды" status="success" />
        <Payment amount={50000} date={"2022-01-01T00:00:00"} title="Оплата аренды" status="pending" />
        <Payment amount={1100} date={"2022-01-01T00:00:00"} title="Переговорка" status="success" />
      </div>
    </div>
  );
};

function Payment({ amount, date, title, status }: { amount: number, date: string, title: string, status: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-background border-2 border-zinc-700 border-opacity-20 rounded-lg">
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
  )
}