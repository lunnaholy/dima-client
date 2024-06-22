import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { UserRoleHandbook } from "../handbooks/userRoleHandbook";
import { RenterHandbook } from "../handbooks/renterHandbook";

export type InputType = "text" | "password" | "email" | "datetime-local" | "user-role" | "renter";

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

export function FormBuilder({ formHook, fields, defaultValues }: { formHook: ReturnType<typeof useForm>, fields: InputField[], defaultValues?: DefaultValues }) {
  useEffect(() => {
    Object.keys(defaultValues || {}).forEach((key) => {
      formHook.setValue(key, defaultValues?.[key] || "");
    });
  }, [defaultValues]);

  const renderInput = (field: InputField) => {
    switch (field.type) {
      case 'text':
      case 'password':
      case 'email':
      case 'datetime-local':
        return (
          <Input
            {...formHook.register(field.name, { required: "Это поле обязательно для заполнения" })}
            type={field.type}
            name={field.name}
            isInvalid={!!formHook.formState.errors[field.name]}
            errorMessage={formHook.formState.errors[field.name]?.message?.toString()}
            placeholder={field.placeholder}
            variant="bordered"
            required
            label={field.label}
            defaultValue={String(defaultValues?.[field.name] || "")}
          />
        );
        break;
      case 'user-role':
        return <UserRoleHandbook
          register={formHook.register(field.name, { required: "Это поле обязательно для заполнения" })}
          isInvalid={!!formHook.formState.errors[field.name]}
          errorMessage={formHook.formState.errors[field.name]?.message?.toString() || ""}
          defaultSelectedKey={String(defaultValues?.[field.name] || "")}
        />;
        break;
      case 'renter':
        return <RenterHandbook
          register={formHook.register(field.name, { required: "Это поле обязательно для заполнения" })}
          isInvalid={!!formHook.formState.errors[field.name]}
          errorMessage={formHook.formState.errors[field.name]?.message?.toString() || ""}
          defaultSelectedKey={String(defaultValues?.[field.name] || "")}
        />;
        break;
    }
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="mb-4 block">
          {renderInput(field)}
        </div>
      ))}
    </>
  );
}