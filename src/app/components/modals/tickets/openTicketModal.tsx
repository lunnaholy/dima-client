import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { FormBuilder } from "../../forms/formBuilder";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

interface IOpenTicketForm {
  subject: string;
  description: string;
  files?: File[];
}

export function OpenTicketModal({ isOpen, onOpenChange, onSubmit }: { isOpen: boolean; onOpenChange: (open: boolean) => void; onSubmit: (data: any) => void; }) {
  const formHook = useForm<IOpenTicketForm>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [isOpen]);

  const submit = (data: any) => {
    setLoading(true);
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Новое обращение</ModalHeader>
            <form onSubmit={formHook.handleSubmit(onSubmit)}>
              <ModalBody>
                <div className="mt-4 mb-4 flex flex-col gap-2">
                  <Input placeholder="Тема обращения" variant="bordered"
                    {...formHook.register("subject", { required: "Тема обращения обязательна" })} />
                  <Textarea placeholder="Описание обращения" variant="bordered"
                    {...formHook.register("description", { required: "Описание обязательно" })} />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-col gap-2 w-full mb-4">
                  <Button color="primary">Прикрепить файлы</Button>
                  <Button color="primary" type="submit" isLoading={loading}>Отправить обращение</Button>
                </div>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}