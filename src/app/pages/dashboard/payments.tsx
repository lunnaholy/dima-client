import { Payment } from "../../components/payments/payment";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { Billing } from "../../../api/billings/billings";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

export function PaymentPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<Billing[]>([]);

  useEffect(() => {
    api.billings.list()
      .then(data => {
        setLoaded(true);
        setData(data.data);
      })
      .catch(_err => {
        toast("Произошла ошибка при загрузке данных!");
      });
  }, [setData]);

  return (
    <div className="flex flex-col gap-2 p-2 md:p-4">
      <span className="text-2xl font-bold">Платежи</span>
      <span className="text-sm max-w-96">
        В этом разделе Вы можете увидеть совершённые Вами платежи.
      </span>
      {/* <Button color="primary" className="max-w-fit">Новый платеж</Button> */}
      { !loaded && (
        <Spinner />
      )}
      { loaded && (
        <>
          {data.length > 0 && (
            <div className="flex flex-row flex-wrap max-w-[720px] gap-3 p-4">
              {data.map((payment, index) => {
                return <Payment key={index} amount={payment.amount} date={payment.date} title={payment.description} status={payment.paid ? "success" : "pending"} />
              })}
            </div>
          )}
          {data.length == 0 && (
            <span>Данные не найдены</span>
          )}
        </>
      )}
    </div>
  );
};