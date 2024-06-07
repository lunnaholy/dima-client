import crud, { ApiResponse } from "../crud"

export interface Billing {
  id: number;
  date: string;
  payer: number;
  provider: number;
  amount: number;
  paid: boolean;
  description: string;
  number: number;
}

export function BillingsAPI(baseUrl: string) {
  return {
    list: async () => {
      return await crud.get(`${baseUrl}/billings/`, undefined, true) as ApiResponse<Location[]>;
    },
    get: async (id: number) => {
      return await crud.get(`${baseUrl}/billings/${id}`, undefined, true) as ApiResponse<Location>;
    }
  }
}