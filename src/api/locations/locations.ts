import crud, { ApiResponse } from "../crud"

export interface Location {
  id: number;
  display_name: string;
  address: string;
  city: string;
  metro_station: string;
  district: string;
}

export function LocationsAPI(baseUrl: string) {
  return {
    list: async () => {
      return await crud.get(`${baseUrl}/locations/`, undefined, true) as ApiResponse<Location[]>;
    },
    get: async (id: number) => {
      return await crud.get(`${baseUrl}/locations/${id}`, undefined, true) as ApiResponse<Location>;
    }
  }
}