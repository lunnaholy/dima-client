import { Chip, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { api } from "../../../api";
import { Renter } from "../../../api/renters/renters";
import { RenterModal } from "./modals/renterModal";

export function RenterChip({ renterId }: { renterId: number }) {
  const [item, setItem] = useState<Renter | null>(null);
  const disclosure = useDisclosure();

  useEffect(() => {
    api.renters.get(renterId)
      .then(data => {
        setItem(data.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <RenterModal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} item={item!} />
      {item !== null && (
        <Chip className="cursor-pointer" onClick={disclosure.onOpen} variant="dot" color="primary">{item?.display_name}</Chip>
      )}
      {item == null && (
        <Chip variant="dot" color="default">н/д</Chip>
      )}
    </>
  );
};