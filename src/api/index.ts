import { AuthAPI } from "./auth/auth";
import { BillingsAPI } from "./billings/billings";
import { LocationsAPI } from "./locations/locations";
import { LocksAPI } from "./locks/locks";
import { OfficiesAPI } from "./officies/officies";
import { RentersAPI } from "./renters/renters";
import { UsersAPI } from "./users/user";

const baseUrl = "http://212.109.223.199:8090/client";

export const api = {
  auth: AuthAPI(baseUrl),
  billings: BillingsAPI(baseUrl),
  locations: LocationsAPI(baseUrl),
  locks: LocksAPI(baseUrl),
  officies: OfficiesAPI(baseUrl),
  renters: RentersAPI(baseUrl),
  users: UsersAPI(baseUrl)
}