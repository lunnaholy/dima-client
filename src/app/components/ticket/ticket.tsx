import { getNormalizedDate } from "../../../utils";
import { Ticket as ITicket } from "../../pages/dashboard/tickets";

export function Ticket({ ticket }: { ticket: ITicket }) {
  return (
    <div className="flex flex-row gap-4 p-3 rounded-xl bg-background">
      <span className="text-sm font-medium">Обращение #{ticket.id} | {getNormalizedDate(ticket.date)}</span>
      <span className="text-sm flex-grow">{ticket.subject}</span>
      <span className="text-sm font-bold">{ticket.status}</span>
    </div>
  );
}