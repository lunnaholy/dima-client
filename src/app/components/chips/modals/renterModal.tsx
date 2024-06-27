import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { TableBuilder } from "../../tables/tableBuilder";
import { UserChip } from "../userChip";
import { Renter } from "../../../../api/renters/renters";

export function RenterModal({ isOpen, onOpenChange, item }: { isOpen: boolean, onOpenChange: (open: boolean) => void, item: Renter }) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Просмотр арендатора</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1 mb-2">
                  <TableBuilder
                    columns={[
                      {
                        label: "Название арендатора",
                        key: "display_name",
                      },
                      {
                        label: "ОГРН",
                        key: "orgn"
                      },
                      {
                        label: "Владелец",
                        key: "holder",
                        render(value, _row) {
                          return <UserChip userId={value} />
                        },
                      },
                      {
                        label: "Номер телефона",
                        key: "phone_number"
                      },
                      {
                        label: "Email",
                        key: "email"
                      },
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