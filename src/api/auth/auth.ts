import crud, { ApiResponse } from "../crud";

function createFormUrlEncoded(data: any) {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

export interface LoginParams {
  username: string;
  password: string;
  grant_type?: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface LoginRequestResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: number;
  renter: number;
  phone_number: string;
  telegram: number;
}

export function AuthAPI(baseUrl: string) {
  return {
    login: async (params: LoginParams) => {
      const res = await crud.post(`${baseUrl}/auth/login`, createFormUrlEncoded(params), false, "application/x-www-form-urlencoded") as LoginRequestResponse;
      localStorage.setItem("access_token", res.access_token);
      return;
    },
    validate: async () => {
      return await crud.post(`${baseUrl}/auth/validate`, {}, true) as string;
    },
    me: async () => {
      return await crud.get(`${baseUrl}/auth/me`, undefined, true) as ApiResponse<User>;
    },
    logout: async () => {
      await crud.post(`${baseUrl}/auth/logout`, {}, true) as string;
      localStorage.clear();
      location.href = "/";
    }
  }
}