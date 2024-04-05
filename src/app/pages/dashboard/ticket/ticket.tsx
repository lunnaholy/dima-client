import { Button, Input } from "@nextui-org/react";
import { FaPaperclip } from "react-icons/fa6";

export function TicketPage() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Обращение “Не работает кондиционер в комнате”</span>
        <div className="flex flex-col p-2 max-w-4xl max-h-[calc(100vh-10%)] overflow-auto">
          <div className="flex flex-col w-full items-end">
            <div className="flex flex-col items-end gap-2 p-2 max-w-lg">
              <span className="text-base font-medium">
                Вы, 30.03.2024 18:36
              </span>
              <div className="flex flex-row gap-2 p-2 bg-primary rounded-xl">
                <span className="text-base font-medium text-right text-background">
                  Здравствуйте! Не работает кондиционер в комнате NNN. Разберитесь, пожалуйста!
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-end">
            <div className="flex flex-col items-end gap-2 p-2 max-w-lg">
              <span className="text-base font-medium">
                Вы, 30.03.2024 18:36
              </span>
              <div className="flex flex-row gap-2 p-2 bg-primary rounded-xl">
                <div className="w-[350px] h-[310px] bg-zinc-600 rounded-xl" />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start">
            <div className="flex flex-col items-start gap-2 p-2 max-w-lg">
              <span className="text-base font-medium">
                Вы, 30.03.2024 18:36
              </span>
              <div className="flex flex-row gap-2 p-2 bg-white rounded-xl">
                <span className="text-base font-medium text-left text-foreground">
                  Заявка создана, ожидайте.
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-start">
            <div className="flex flex-col items-start gap-2 p-2 max-w-lg">
              <span className="text-base font-medium">
                Вы, 30.03.2024 18:36
              </span>
              <div className="flex flex-row gap-2 p-2 bg-white rounded-xl">
                <span className="text-base font-medium text-left text-foreground">
                  Неисправность устранена. 
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-end">
            <div className="flex flex-col items-end gap-2 p-2 max-w-lg">
              <span className="text-base font-medium">
                Вы, 30.03.2024 18:36
              </span>
              <div className="flex flex-row gap-2 p-2 bg-primary rounded-xl">
                <span className="text-base font-medium text-right text-background">
                  Большое спасибо!
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row max-w-4xl gap-2 items-center mt-auto">
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