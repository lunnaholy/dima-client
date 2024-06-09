import { User } from "../auth/auth";
import crud, { ApiResponse } from "../crud";

interface CreateUserParams {
  id: number,
  username: string,
  hashed_password: string,
  salt: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  role: number,
  renter: number,
  phone_number: string,
  telegram: number
}

export function UsersAPI(baseUrl: string) {
  return {
    list: async () => {
      return await crud.get(`${baseUrl}/users/`, undefined, true) as ApiResponse<User[]>;
    },
    create: async (params: CreateUserParams) => {
      return await crud.post(`${baseUrl}/users/`, params, true) as ApiResponse<User>;
    },
    get: async (id: number) => {
      return await crud.get(`${baseUrl}/users/${id}`, undefined, true) as ApiResponse<User>;
    },
    update: async (id: number, params: Partial<CreateUserParams>) => {
      return await crud.put(`${baseUrl}/users/${id}`, params, true) as ApiResponse<User>;
    },
    delete: async (id: number) => {
      return await crud.delete(`${baseUrl}/users/${id}`, true) as ApiResponse<boolean>;
    }
  }
}