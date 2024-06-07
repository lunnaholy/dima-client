import crud, { ApiResponse } from "../crud"

export interface Renter {
  id: number;
  display_name: string;
  orng: string;
  phone_number: string;
  email: string;
  holder: number;
}

export function RentersAPI(baseUrl: string) {
  return {
    list: async () => {
      return await crud.get(`${baseUrl}/renters/`, undefined, true) as ApiResponse<Renter[]>;
    },
    get: async (id: number) => {
      return await crud.get(`${baseUrl}/renters/${id}`, undefined, true) as ApiResponse<Renter>;
    }
  }
}