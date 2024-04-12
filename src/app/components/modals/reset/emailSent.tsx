import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { getDayName, getLottieOptions, getPortal } from "../../../../utils";
import * as EmailSent from '../../../../static/lottie/EmailSent.json';
import { Link } from "react-router-dom";
import Lottie from "../../lottie/lottie";

export function EmailSentModal({ title, isOpen, onOpenChange }: { title: string, isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center" scrollBehavior="outside" size="sm" portalContainer={getPortal()}>
        <ModalContent>
          {(onClose) => (
            <div className="flex flex-col gap-3 p-4 mt-2 mb-2 items-center justify-center">
              <span className="text-2xl font-bold">{title}</span>
              <span className="text-center">Уже отправили на вашу почту ссылку для сброса пароля.</span>
              <span className="text-center">Проверьте свой почтовый ящик, а так же папки “Спам” и “Промо-акции”.</span>
              <div className="flex flex-row p-2">
                {/* <Lottie
                  animationData={EmailSent}
                  /> */}
              </div>
              <Button color="primary" variant="solid" size="lg" className="font-medium w-full">Отправить заново</Button>
              <Link to="#" className="text-primary font-medium">У меня нет доступа к почте</Link>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}