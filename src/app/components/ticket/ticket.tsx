import { useNavigate, useNavigation } from "react-router-dom";
import { getNormalizedDate } from "../../../utils";
import { Ticket as ITicket } from "../../pages/dashboard/tickets";

export function Ticket({ ticket }: { ticket: ITicket }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-4 p-3 rounded-xl bg-background" onClick={() => navigate("/dashboard/tickets/1")}>
      <span className="text-sm font-medium">Обращение #{ticket.id} | {getNormalizedDate(ticket.date)}</span>
      <span className="text-sm flex-grow">{ticket.subject}</span>
      <span className="text-sm font-bold">{ticket.status}</span>
    </div>
  );
}