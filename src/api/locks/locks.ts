import crud from "../crud"

export function LocksAPI(baseUrl: string) {
  return {
    unlock: async (id: number) => {
      return await crud.get(`${baseUrl}/locks/${id}/unlock`, undefined, true) as string;
    },
    lock: async (id: number) => {
      return await crud.post(`${baseUrl}/locks/${id}/lock`, {}, true) as string;
    }
  }
}