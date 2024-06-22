import { api } from "../api";

export async function getIdFromRenterHandbook(displayName: string) {
  const { data } = await api.renters.list();

  return (data.filter(el => el.display_name == displayName)[0]?.id || displayName);
}

export async function getIdFromUserRoleHandbook(displayName: string) {
  const data = [
    {
      "display_name": "Представитель арендатора",
      "id": 1
    },
    {
      "display_name": "Сотрудник",
      "id": 2
    },
    {
      "display_name": "Арендатор",
      "id": 3
    }
  ];

  return (data.filter(el => el.display_name == displayName)[0]?.id || displayName);
}