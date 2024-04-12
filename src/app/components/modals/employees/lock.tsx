import { Button, Input, Modal, ModalContent, Spacer, useDisclosure } from "@nextui-org/react";

export function LockModal({ disclosure }: { disclosure: ReturnType<typeof useDisclosure>}) {
  return (
    <>
      <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
        <ModalContent>
          <div className="p-8 gap-3 flex flex-col">
            <span className="font-bold text-xl">Настройка замка</span>
            <span className="text-sm">Поставьте пароль на замок для этого пользователя</span>
            <Spacer />
            <Input placeholder="Пароль" variant="bordered" />
            <Spacer />
            <Button size="md" color="primary" variant="solid" className="w-full">Подтвердить</Button>
            <Button size="md" color="primary" variant="flat" className="w-full">Деактивировать</Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}