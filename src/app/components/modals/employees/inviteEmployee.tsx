import { Button, Input, Modal, ModalContent, Spacer, useDisclosure } from "@nextui-org/react";
import { InvitesModal } from "./invites";

export function InviteEmployeeModal({ disclosure }: { disclosure: ReturnType<typeof useDisclosure>}) {
  const invitesDisclosure = useDisclosure();

  return (
    <>
      <InvitesModal disclosure={invitesDisclosure} />
      <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
        <ModalContent>
          <div className="p-8 gap-3 flex flex-col">
            <span className="font-bold text-xl">Приглашение</span>
            <Spacer />
            <div className="flex flex-col gap-2">
              <Input placeholder="Адрес почты" variant="bordered" />
              <div className="flex flex-row gap-2">
                <Input placeholder="Имя" variant="bordered" />
                <Input placeholder="Фамилия" variant="bordered" />
              </div>
            </div>
            <Spacer />
            <span className="text-sm font-bold text-red-950 dark:text-red-800">Вы собираетесь отправить приглашение на вступлению в Вашу компанию в роли сотрудника. Это значит, что получателю будут доступны все функции кабинета Вашей компании. Перепроверьте адрес получателя перед отправкой приглашения.</span>
            <Spacer />
            <Button size="md" color="primary" variant="solid" className="w-full">Отправить приглашение</Button>
            <Button size="md" color="primary" variant="light" className="w-full" onClick={invitesDisclosure.onOpen}>8 приглашений ожидают принятия</Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}