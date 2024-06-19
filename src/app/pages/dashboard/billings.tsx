import { TableBuilder } from "../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { Billing } from "../../../api/billings/billings";

export function BillingsPage() {
  const [billings, setBillings] = useState<Billing[]>([]);

  useEffect(() => {
    api.billings.list()
      .then(data => {
        setBillings(data.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Произошла ошибка при загрузке платежей!");
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-bold text-2xl">Платежи</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="font-sm">Ниже отображены все платежи, связанные с Вами.</span>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <TableBuilder
            columns={[
              {
                label: "Сумма",
                key: "amount"
              }, {
                label: "Провайдер",
                key: "provider"
              }, {
                label: "Статус",
                key: "paid",
                render(value, _row) {
                  return (<span>{ value ? 'Оплачен' : 'Не оплачен' }</span>)
                },
              }, {
                label: "payer",
                key: "Плательщик"
              }, {
                label: "Дата",
                key: "date"
              }, {
                label: "Действия",
                key: "actions",
                render(_value, _row: Billing) {
                  return (
                    <div className="flex flex-row gap-2">
                      {/* TODO сделать модальку для просмотра и копирования деталей */}
                    </div>
                  )
                },
              }
            ]}
            data={billings}
          />
        </div>
      </div>
    </>
  )
}