import { Button } from "@nextui-org/react";
import { Payment } from "../../components/payments/payment";

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