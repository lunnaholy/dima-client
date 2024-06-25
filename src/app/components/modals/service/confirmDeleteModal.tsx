import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { FaCircleExclamation } from "react-icons/fa6";

export function ConfirmDeleteModal({ isOpen, onOpenChange, callback }: { isOpen: boolean, onOpenChange: (open: boolean) => void, callback: () => void }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-6">
              <div className="flex flex-row gap-4 items-center mb-2">
                <div className="bg-red-100 p-4 max-w-fit rounded-xl">
                  <FaCircleExclamation className="text-red-500" />
                </div>
                <span className="text-xl font-bold">Внимание!</span>
              </div>
              <span>Вы собираетесь <span className="font-bold text-red-500">УДАЛИТЬ</span> данные, которые помечены как <span className="font-bold">важные</span></span>
              <span>Удаление относится к действиям, которые невозможно отменить или откатить в случае необходимости.</span>
              <span>Продолжить удаление?</span>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-row gap-4 justify-end items-center w-full">
                <Button variant="flat" color="default" onClick={onClose}>Нет, я передумал</Button>
                <Button variant="flat" color="danger" onClick={() => { callback(); onClose(); }}>Да, я уверен</Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}