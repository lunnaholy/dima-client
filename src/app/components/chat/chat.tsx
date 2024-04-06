import { getNormalizedDate } from "../../../utils";

export interface IAttachment {
  name: string;
  url: string;
  type: "image" | "file";
}

export interface IMessage {
  id: number;
  message: string;
  user: string;
  date: string;
  isSupport: boolean;
  isMe: boolean;
  attachment: IAttachment | null;
}

export interface IChat {
  id: number;
  title: string;
  messages: IMessage[];
  adminView: boolean;
}

export function Chat({ data }: { data: IChat }) {
  return (
    <>
      <div className="flex flex-col flex-grow gap-2 max-h-[calc(100vh-10%)]">
        <span className="text-2xl font-bold">Обращение “{data.title}”</span>
        <div className="flex flex-col p-2 max-w-4xl flex-grow  overflow-auto">
          {data.messages.map((message) => (
            <Message key={message.id} adminView={data.adminView} message={message} />
          ))}
        </div>
      </div>
    </>
  );
}

export function Message({ adminView, message }: { adminView: boolean, message: IMessage }) {
  return (
    <>
      <div className={`flex flex-col w-full items-${adminView == false && message.isMe ? 'end' : 'start'}`}>
        <div className={`flex flex-col items-${adminView == false && message.isMe ? 'end' : 'start'} gap-2 p-2 max-w-lg`}>
          <span className="text-base font-medium">
            Вы, {getNormalizedDate(message.date)}
          </span>
          <div className={`flex flex-row gap-2 p-2 ${adminView == false && message.isMe ? 'bg-primary' : 'bg-white'} rounded-xl`}>
            {message.attachment && message.attachment.type === 'image' ? (
              <div className={`w-[350px] h-[310px] bg-zinc-600 rounded-xl`} />
            ) : (
              <span className={`text-base font-normal text-${adminView == false && message.isMe ? 'right' : 'left'} text-${adminView == false && message.isMe ? 'background' : 'foreground'}`}>
                {message.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}