import { Chip, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { api } from "../../../api";
import { User } from "../../../api/auth/auth";
import { UserModal } from "./modals/userModal";

export function UserChip({ userId }: { userId: number }) {
  const [item, setItem] = useState<User | null>(null);
  const disclosure = useDisclosure();

  useEffect(() => {
    api.users.get(userId)
      .then(data => {
        setItem(data.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <UserModal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange} item={item!} />
      {item !== null && (
        <Chip className="cursor-pointer" onClick={disclosure.onOpen} variant="dot" color="primary">{item?.first_name} {item?.last_name}</Chip>
      )}
      {item == null && (
        <Chip variant="dot" color="default">н/д</Chip>
      )}
    </>
  );
};