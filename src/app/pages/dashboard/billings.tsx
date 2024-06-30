import { ColumnType, TableBuilder } from "../../components/tables/tableBuilder";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { toast } from "react-toastify";
import { Billing } from "../../../api/billings/billings";
import { RenterChip } from "../../components/chips/renterChip";

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
        <div className="flex flex-col gap-2">
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
                key: "amount",
                type: ColumnType.Number,
              }, {
                label: "Провайдер",
                key: "provider",
                type: ColumnType.String,
              }, {
                label: "Статус",
                key: "paid",
                type: ColumnType.Boolean
              }, {
                label: "Плательщик",
                key: "payer",
                type: ColumnType.Renter
              }, {
                label: "Дата",
                key: "date",
                type: ColumnType.Date
              }
            ]}
            data={billings}
          />
        </div>
      </div>
    </>
  )
}