import { Button, useDisclosure } from "@nextui-org/react";
import { FaCrown, FaLock, FaPenToSquare } from "react-icons/fa6";
import { InviteEmployeeModal } from "../../components/modals/employees/inviteEmployee";
import { LocksModal } from "../../components/modals/employees/locks";

export function EmployeesPage() {
  const inviteModal = useDisclosure();

  return (
    <>
      <InviteEmployeeModal disclosure={inviteModal} />
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Сотрудники</span>
        <span className="text-sm max-w-96">
          В этом разделе Вы можете управлять сотрудниками Вашей компании.
        </span>
        <Button size="sm" color="primary" variant="solid" className="max-w-fit" onClick={inviteModal.onOpen}>Пригласить сотрудника</Button>
        <div className="flex flex-col gap-3 p-3 max-w-3xl">
          <Employee employee="Иван Иванов" />
          <Employee employee="Петр Петров" />
          <Employee employee="Сидор Сидоров" />
          <Employee employee="Мария Мариева" />
        </div>
      </div>
    </>
  )
}

function Employee({ employee }: { employee: string }) {
  const locksModal = useDisclosure();

  return (
    <>
      <LocksModal disclosure={locksModal} />
      <div className="flex flex-row items-center gap-4 p-2 rounded-xl bg-background">
        <div className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 bg-zinc-500 rounded-xl"></div>
          <span className="text-sm">{employee}</span>
        </div>
        <div className="flex flex-row gap-2">
          <FaCrown />
          <span className="text-sm">арендатор</span>
        </div>
        <div className="flex flex-row gap-2 flex-grow justify-end">
          <FaLock className="text-primary cursor-pointer" onClick={locksModal.onOpen} />
          <FaPenToSquare className="text-primary cursor-pointer" />
        </div>
      </div>
    </>
  )
};