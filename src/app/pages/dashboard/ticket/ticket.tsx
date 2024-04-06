import { Button, Input } from "@nextui-org/react";
import { FaPaperclip } from "react-icons/fa6";
import { Chat, IChat } from "../../../components/chat/chat";

export function TicketPage() {
  const chatData: IChat = {
    id: 1,
    title: "Проблема с принтером",
    adminView: false,
    messages: [
      {
        id: 1,
        message: "Здравствуйте, у меня проблема с принтером. Он не печатает. Что делать?",
        user: "Василий Петров",
        date: "1980-12-12T12:00:00",
        isSupport: false,
        isMe: true,
        attachment: null,
      },
      {
        id: 2,
        message: "Здравствуйте, Василий. Попробуйте перезагрузить принтер.",
        user: "Администратор",
        date: "1980-12-12T12:00:00",
        isSupport: true,
        isMe: false,
        attachment: null,
      },
      {
        id: 3,
        message: "Спасибо, помогло!",
        user: "Василий Петров",
        date: "1980-12-12T12:00:00",
        isSupport: false,
        isMe: true,
        attachment: null,
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4 h-full">
        <Chat data={chatData} />
        <div className="flex flex-row max-w-4xl gap-2 items-center">
          <div className="flex-grow">
            <Input variant="bordered" placeholder="Введите сообщение" />
          </div>
          <Button color="default"><FaPaperclip /></Button>
          <Button color="primary">Отправить</Button>
        </div>
      </div>
    </>
  )
}