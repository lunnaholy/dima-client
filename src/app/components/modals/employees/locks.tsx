import { Modal, ModalContent, Spacer, useDisclosure } from "@nextui-org/react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { LockModal } from "./lock";

export function LocksModal({ disclosure }: { disclosure: ReturnType<typeof useDisclosure>}) {
  return (
    <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} portalContainer={document.getElementById("main")!} size="lg" backdrop="blur" scrollBehavior="outside">
      <ModalContent>
        <div className="p-8 gap-3 flex flex-col">
          <span className="font-bold text-xl">Приглашения</span>
          <span className="text-sm">Выберите, к каким замкам будет иметь доступ Александр Соколов</span>
          <Spacer />
          <div className="flex flex-row flex-wrap gap-3">
            <Lock lockName="Замок 1" active={true} />
            <Lock lockName="Замок 2" active={false} />
            <Lock lockName="Замок 3" active={true} />
            <Lock lockName="Замок 4" active={true} />
            <Lock lockName="Замок 5" active={false} />
            <Lock lockName="Замок 6" active={true} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

function Lock({ lockName, active }: { lockName: string, active: boolean }) {
  const lockDisclosure = useDisclosure();

  return (
    <>
      <LockModal disclosure={lockDisclosure} />
      <div className={`flex flex-col gap-3 px-4 py-3 ${active ? "bg-primary text-white" : "bg-background text-foreground"} border-2 border-black border-opacity-20 rounded-xl cursor-pointer select-none flex-grow`} onClick={lockDisclosure.onOpen}>
        <span className="text-sm">{lockName}</span>
        { active && <FaToggleOn className="text-white" />}
        { !active && <FaToggleOff className="text-primary" />}
      </div>
    </> 
  )
}