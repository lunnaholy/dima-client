import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Ticket } from "../../components/ticket/ticket";

export enum TicketStatus {
  READ = "Прочитано",
  WAITING_FOR_CLIENT_RESPONSE = "Ожидает вашего ответа",
  WAITING_FOR_SUPPORT_RESPONSE = "Ожидает ответа администратора",
}

export interface Ticket {
  id: number;
  date: string;
  subject: string;
  status: TicketStatus;
}

export function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets([
      { id: 1, date: "1980-12-12T12:00:00", subject: "Проблема с принтером", status: TicketStatus.WAITING_FOR_SUPPORT_RESPONSE },
      { id: 2, date: "1980-12-12T12:00:00", subject: "Проблема с интернетом", status: TicketStatus.WAITING_FOR_CLIENT_RESPONSE },
      { id: 3, date: "1980-12-12T12:00:00", subject: "Проблема с мебелью", status: TicketStatus.READ },
    ]);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4 select-none cursor-pointer">
        <span className="text-2xl font-bold">Тикеты</span>
        <span className="text-sm max-w-96">
          Отправьте запрос чего-то там администратору Вашего коворкинга.
        </span>
        <Button color="primary" size="sm">Новое обращение</Button>
        <div className="flex flex-col gap-2 mt-2">
          {tickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  )
}