import crud, { ApiResponse } from "../crud"

export interface Office {
  id: number;
  display_name: string;
  office_type: number;
  area: number;
  price: number;
  room_count: number;
  location: number;
  floor: number;
  office_lock: number;
}

export function OfficiesAPI(baseUrl: string) {
  return {
    list: async () => {
      return await crud.get(`${baseUrl}/officies/`, undefined, true) as ApiResponse<Office[]>;
    },
    get: async (id: number) => {
      return await crud.get(`${baseUrl}/officies/${id}`, undefined, true) as ApiResponse<Office>;
    }
  }
}