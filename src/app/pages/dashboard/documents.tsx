import { Button } from "@nextui-org/react";
import { Document } from "../../components/documents/document";

export function DocumentsPage() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Документы</span>
        <span className="text-sm max-w-96">
          В этом разделе Вы можете управлять документами, связанными с Вашей компанией.
        </span>
        <span className="text-xl font-semibold mt-2">Акт то-то то-то</span>
        <div className="flex flex-row gap-2 p-2 mt-2 items-center">
          <Document />
          <Document />
          <Document />
          <Document />
          <Button color="primary" variant="light" className="w-full">Просмотреть все документы</Button>
        </div>
        <span className="text-xl font-semibold mt-2">Акт то-то то-то</span>
        <div className="flex flex-row gap-2 p-2 mt-2 items-center">
          <Document />
          <Document />
          <Document />
          <Document />
          <Button color="primary" variant="light" className="w-full">Просмотреть все документы</Button>
        </div>
        <span className="text-xl font-semibold mt-2">Акт то-то то-то</span>
        <div className="flex flex-row gap-2 p-2 mt-2 items-center">
          <Document />
          <Document />
          <Document />
          <Document />
          <Button color="primary" variant="light" className="w-full">Просмотреть все документы</Button>
        </div>
      </div>
    </>
  )
}