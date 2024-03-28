import crud, { APIResponse } from "../crud"

export interface Translation {
  code: string;
  displayName: string;
  svg: string;
}

export function LangAPI(baseUrl: string) {
  return {
    getAvailableTranslations: async () => {
      const translations =  (await crud.get(`${baseUrl}client/translations/languages`, [], false)) as APIResponse<{ id: number, languageName: string; displayName: string; svg: string; }[]>;
      return translations.data.map(({ languageName, displayName, svg }) => ({ code: languageName, displayName, svg }));
    }
  }
}