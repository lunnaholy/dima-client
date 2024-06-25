import { Button, Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { FaTriangleExclamation } from "react-icons/fa6";

export function ConfirmEditModal({ isOpen, onOpenChange, data, callback }: { isOpen: boolean, onOpenChange: (open: boolean) => void, data: any, callback: (data: any) => void }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="py-6">
              <div className="flex flex-row gap-4 items-center mb-2">
                <div className="bg-warning-100 p-4 max-w-fit rounded-xl">
                  <FaTriangleExclamation className="text-warning" />
                </div>
                <span className="text-xl font-bold">Внимание!</span>
              </div>
              <span>Вы собираетесь отредактировать данные, которые помечены как <span className="font-bold">важные</span></span>
              <span>Редактирование относится к действиям, которые невозможно отменить или откатить в случае необходимости.</span>
              <span>Продолжить редактирование?</span>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-row gap-4 justify-end items-center w-full">
                <Button variant="flat" color="default" onClick={onClose}>Нет, я передумал</Button>
                <Button variant="flat" color="warning" onClick={() => { callback(data); onClose(); }}>Да, я уверен</Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}