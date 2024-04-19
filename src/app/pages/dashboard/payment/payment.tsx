import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export function PaymentInfoPage() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Платёж</span>
        <span className="text-sm max-w-96">
          Информация о платеже №1337 от 06 апр 2024 13:37
        </span>
        <div className="p-8 gap-3 flex flex-col bg-background rounded-xl max-w-96">
          <span className="text-2xl font-bold">Платёж</span>
          <span className="text-lg font-medium">110.000р</span>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-sm font-medium text-opacity-60">назначение платежа</span>
            <span className="text-lg font-medium">Аренда (месяц)</span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-sm font-medium text-opacity-60">дата платежа</span>
            <span className="text-lg font-medium">06 апр 2024 13:37</span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-sm font-medium text-opacity-60">статус платежа</span>
            <span className="text-lg font-medium">Оплачено</span>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <Link to="/dashboard/payments/1">
              <Button color="primary" variant="solid" className="font-medium w-full">
                Просмотреть документы
              </Button>
            </Link>
            <Button color="primary" variant="flat" className="font-medium w-full">Повторить платёж</Button>
          </div>
        </div>
      </div>
    </>
  )
};