import { Chip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api";
import { User } from "../../../api/auth/auth";

export function UserChip({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.users.get(userId)
      .then(data => {
        setUser(data.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {user !== null && (
        <Chip as={Link} to={"/dashboard/users"} variant="dot" color="primary">{user?.first_name} {user?.last_name}</Chip>
      )}
      {user == null && (
        <Chip variant="dot" color="default">н/д</Chip>
      )}
    </>
  );
};