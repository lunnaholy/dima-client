import { api } from "../../api";
const LAST_VALIDATE_KEY = 'last_validate_time';

export async function IndexLoader(_args: any) {
  return {};
}

function getLastValidateTime() {
  const time = localStorage.getItem(LAST_VALIDATE_KEY);
  return time ? parseInt(time, 10) : null;
}

function setLastValidateTime(time: number) {
  localStorage.setItem(LAST_VALIDATE_KEY, time.toString());
}

export async function DashboardLoader(_args: any) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    localStorage.clear();
    location.href = "/";
    return;
  }

  const currentTime = Date.now();
  const lastValidateTime = getLastValidateTime();

  if (!lastValidateTime || (currentTime - lastValidateTime) > 120 * 1000) {
    await api.auth.validate();
    setLastValidateTime(currentTime);
  }

  return {};
}