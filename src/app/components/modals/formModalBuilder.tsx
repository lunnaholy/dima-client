import { Modal, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormBuilder } from "../forms/formBuilder";

export type InputType = "text" | "password" | "email" | "datetime-local";

export interface InputField {
  type: InputType;
  name: string;
  label: string;
  placeholder: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export interface DefaultValues {
  [key: string]: string;
}

export interface ModalBuilderProps {
  title: string;
  fields: InputField[];
  defaultValues?: DefaultValues;
  isOpen: boolean;
  displayDeleteButton?: boolean;
  submitButtonText?: string;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function FormModalBuilder({
  title,
  fields,
  defaultValues,
  isOpen,
  displayDeleteButton = false,
  submitButtonText = "Создать",
  onSubmit,
  onDelete,
  onOpenChange,
}: ModalBuilderProps) {
  const formHook = useForm({ defaultValues});
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
            <ModalHeader>{title}</ModalHeader>
            <form onSubmit={formHook.handleSubmit(submit)}>
              <ModalBody>
                <FormBuilder formHook={formHook} fields={fields} defaultValues={defaultValues} />
              </ModalBody>
              <ModalFooter>
                <div className="flex flex-grow flex-row gap-2">
                  <Button color="default" onClick={onClose} variant="flat">Закрыть</Button>
                </div>
                {displayDeleteButton && (
                  <Button color="danger" onClick={onDelete} variant="flat">Удалить</Button>
                )}
                <Button color="success" type="submit" variant="flat" isLoading={loading}>{submitButtonText}</Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}