import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { TableBuilder } from "../../tables/tableBuilder";
import { User } from "../../../../api/auth/auth";

export function UserModal({ isOpen, onOpenChange, item }: { isOpen: boolean, onOpenChange: (open: boolean) => void, item: User }) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Просмотр пользователя</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1 mb-2">
                  <TableBuilder
                    columns={[
                      {
                        label: "Имя пользователя",
                        key: "username",
                      },
                      {
                        label: "Имя",
                        key: "first_name"
                      },
                      {
                        label: "Фамилия",
                        key: "last_name"
                      },
                      {
                        label: "Номер телефона",
                        key: "phone_number"
                      }
                    ]}
                    data={[item]}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" color="default" onClick={onClose}>Закрыть</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}