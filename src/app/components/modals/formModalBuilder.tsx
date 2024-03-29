import { Modal, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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

// TODO: перенести рендер форм в отдельный файл
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ defaultValues });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [isOpen]);

  useEffect(() => {
    Object.keys(defaultValues || {}).forEach((key) => {
      setValue(key, defaultValues?.[key] || "");
    });
  }, [defaultValues]);

  const submit = (data: any) => {
    setLoading(true);
    onSubmit(data);
  };

  const renderInput = (field: InputField) => {
    switch (field.type) {
      case 'text':
      case 'password':
      case 'email':
      case 'datetime-local':
        return (
          <Input
            {...register(field.name, { required: "Это поле обязательно для заполнения" })}
            type={field.type}
            name={field.name}
            isInvalid={!!errors[field.name]}
            errorMessage={errors[field.name]?.message}
            placeholder={field.placeholder}
            variant="bordered"
            required
            label={field.label}
            defaultValue={String(defaultValues?.[field.name] || "")}
          />
        );
        break;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} portalContainer={document.getElementById("main")!} backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <form onSubmit={handleSubmit(submit)}>
              <ModalBody>
                {fields.map((field, index) => (
                  <div key={index} className="mb-4 block">
                    {renderInput(field)}
                  </div>
                ))}
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