import { Button, Input, Modal, ModalContent, Spacer, useDisclosure } from "@nextui-org/react";
import { FaX } from "react-icons/fa6";

export function InvitesModal({ disclosure }: { disclosure: ReturnType<typeof useDisclosure>}) {
  return (
    <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        <div className="p-8 gap-3 flex flex-col">
          <span className="font-bold text-xl">Приглашения</span>
          <Spacer />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between p-2">
              <span className="text-sm">Александр Соколов</span>
              <div className="flex flex-row gap-2">
                <span className="text-sm">example@test.com</span>
                <FaX className="text-primary cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-2">
              <span className="text-sm">Александр Соколов</span>
              <div className="flex flex-row gap-2">
                <span className="text-sm">example@test.com</span>
                <FaX className="text-primary cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-2">
              <span className="text-sm">Александр Соколов</span>
              <div className="flex flex-row gap-2">
                <span className="text-sm">example@test.com</span>
                <FaX className="text-primary cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between p-2">
              <span className="text-sm">Александр Соколов</span>
              <div className="flex flex-row gap-2">
                <span className="text-sm">example@test.com</span>
                <FaX className="text-primary cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}