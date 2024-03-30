import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { getDayName, getPortal } from "../../../../utils";

export function ScheduleModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }){
  const schedule = [
    {
      day: "monday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "tuesday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "wednesday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "thursday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "friday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "saturday",
      openTime: "8:00",
      closeTime: "23:00"
    },
    {
      day: "sunday",
      openTime: "8:00",
      closeTime: "23:00"
    }
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" placement="center" scrollBehavior="outside" size="sm" portalContainer={getPortal()}>
      <ModalContent>
        <>
          <ModalHeader>
            <h2>График</h2>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              {schedule.map((day) => (
                <div className="flex flex-row justify-between items-center">
                  <span className="text-base">{getDayName(day.day)}</span>
                  <span className="text-base">{day.openTime} - {day.closeTime}</span>
                </div>
              ))}
              {/* <div className="flex flex-row justify-between items-center">
                <span>понедельник</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>вторник</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>среда</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>четверг</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>пятница</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>суббота</span>
                <span>8:00 - 23:00</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>воскресенье</span>
                <span>8:00 - 23:00</span>
              </div> */}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}