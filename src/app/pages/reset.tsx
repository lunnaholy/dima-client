import { Button, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EmailSentModal } from "../components/modals/reset/emailSent";

export function ResetPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const emailSentModal = useDisclosure();

  return (
    <>
      <EmailSentModal isOpen={emailSentModal.isOpen} onOpenChange={emailSentModal.onOpenChange} title="Я забыл пароль" />
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[url(/Bg.png)] bg-cover bg-center">
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-[8px] md:min-w-[515px]">
          <h2>Восстановление аккаунта</h2>
          <span className="font-regular max-w-64">Выберите причину, по которой вы не можете войти в свой аккаунт</span>
          <div className="flex flex-col gap-2 mt-4 mb-4">
            <Button variant="bordered" color="default"  className="justify-start font-medium" onClick={emailSentModal.onOpen}>Я не помню пароль</Button>
            <Button variant="bordered" color="default" className="justify-start font-medium" onClick={emailSentModal.onOpen}>У меня нет доступа к аутентификатору</Button>
            <Button variant="bordered" color="default" className="justify-start font-medium" onClick={emailSentModal.onOpen}>Я не помню свой email/нет доступа</Button>
          </div>
          <Button variant="flat" color="primary" className="font-medium" onClick={goBack}>Назад</Button>
        </div>
      </div>
    </>
  )
}