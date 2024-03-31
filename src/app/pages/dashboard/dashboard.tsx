import { Button, useDisclosure } from "@nextui-org/react";
import { ScheduleModal } from "../../components/modals/schedule/scheduleModal";

export function DashboardHome() {
  const scheduleModal = useDisclosure();

  return (
    <>
      <ScheduleModal isOpen={scheduleModal.isOpen} onOpenChange={scheduleModal.onClose} />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3">
          <div className="w-[540px] h-[290px] bg-gray-500 bg-opacity-50 rounded-xl" />
          <span className="text-base font-semibold">ElasticWork Сокол</span>
          <div className="flex flex-col p-4 gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-950 border-2 border-foreground border-opacity-10">
            <span className="text-sm text-primary">ул. Саврасова, д. 7</span>
            <span className="text-sm text-foreground-500">Креативные коворкинги и офисы в зеленой зоне Москвы.</span>
          </div>
          <div className="mt-4 mb-4 flex flex-row justify-between items-center">
            <span className="text-foreground-500 text-sm">
              понедельник - 23:20 -
              <span className="text-red-900"> сейчас закрыто</span>
            </span>
            <Button color="primary" variant="bordered" size="sm" onClick={scheduleModal.onOpen}>График работы</Button>
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <Button className="w-full" as="a" href="#" color="primary" size="sm">Позвонить</Button>
            <Button className="w-full" as="a" href="#" color="primary" size="sm">Открыть тикет</Button>
            <Button className="w-full" as="a" href="#" color="primary" size="sm">Сайт</Button>
          </div>
        </div>
      </div>
    </>
  )
}