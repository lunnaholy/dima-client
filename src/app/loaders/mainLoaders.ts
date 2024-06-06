import { api } from "../../api";

export async function IndexLoader(_args: any) {
  return {};
}

export async function DashboardLoader(_args: any) {
  const token = localStorage.getItem("access_token");
  if(!token) {
    localStorage.clear();
    location.href = "/";
  }
  
  await api.auth.validate();
  return {};
}