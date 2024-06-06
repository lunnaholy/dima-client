import { AuthAPI } from "./auth/auth";

const baseUrl = "http://212.109.223.199:8090/client";

export const api = {
  auth: AuthAPI(baseUrl)
}