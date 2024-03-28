import { LangAPI } from "./lang";

const baseUrl = "https://api.elasticwork.space:8000/";

export const api = {
  translations: LangAPI(baseUrl)
}