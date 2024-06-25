import { Chip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api";
import { Renter } from "../../../api/renters/renters";

export function RenterChip({ renterId }: { renterId: number }) {
  const [item, setItem] = useState<Renter | null>(null);

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
      {item !== null && (
        <Chip as={Link} to={"/dashboard/renters"} variant="dot" color="primary">{item?.display_name}</Chip>
      )}
      {item == null && (
        <Chip variant="dot" color="default">н/д</Chip>
      )}
    </>
  );
};