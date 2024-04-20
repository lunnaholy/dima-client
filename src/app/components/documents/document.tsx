import { Button } from "@nextui-org/react";

export function Document() {
  return (
    <div className="gap-2 p-4 flex flex-col rounded-xl bg-background">
      <span>Договор о том-то том-то</span>
      <span className="text-sm text-opacity-50">Заключён 25.04.2024</span>
      <span className="text-sm text-opacity-50">Подписан цифровой подписью</span>
      <span className="text-sm text-opacity-50">Ещё что-то из информации тут</span>
      <div className="w-[240px] h-[130px] bg-zinc-500 rounded-xl block"></div>
      <Button color="primary" variant="solid" className="w-full">Просмотреть</Button>
      <Button color="primary" variant="light" className="w-full">Скачать</Button>
    </div>
  )
}