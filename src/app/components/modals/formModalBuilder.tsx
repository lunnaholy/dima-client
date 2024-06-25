import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormBuilder } from "../forms/formBuilder";
import { ConfirmEditModal } from "./service/confirmEditModal";
import { ConfirmDeleteModal } from "./service/confirmDeleteModal";

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
  isSensitiveData: boolean;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function FormModalBuilder({
  title,
  fields,
  defaultValues,
  isOpen,
  submitButtonText = "Создать",
  isSensitiveData,
  onSubmit,
  onDelete,
  onOpenChange,
}: ModalBuilderProps) {
  const formHook = useForm({ defaultValues});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const editSensitiveDisclosure = useDisclosure();
  const deleleleSensetiveDisclosure = useDisclosure();

  useEffect(() => {
    setLoading(false);
  }, [isOpen]);

  const submit = (data: any) => {
    if(isSensitiveData) {
      setData(data);
      editSensitiveDisclosure.onOpen();
    } else {
      onSubmit(data);
    }

    setLoading(true);
  };

  const del = () => {
    if(isSensitiveData) {
      deleleleSensetiveDisclosure.onOpen();
    } else {
      if(onDelete) onDelete();
    }
  };

  return (
    <>
      <ConfirmEditModal isOpen={editSensitiveDisclosure.isOpen} onOpenChange={editSensitiveDisclosure.onOpenChange} callback={onSubmit} data={data} />
      <ConfirmDeleteModal isOpen={deleleleSensetiveDisclosure.isOpen} onOpenChange={deleleleSensetiveDisclosure.onOpenChange} callback={onDelete!} />

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
                  {onDelete && (
                    <Button color="danger" onClick={del} variant="flat">Удалить</Button>
                  )}
                  <Button color="success" type="submit" variant="flat" isLoading={loading}>{submitButtonText}</Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}