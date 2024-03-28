import { useState, useEffect } from "react";
import { Translation } from "../api/lang";
import { api } from "../api";

export default function useTranslations() {
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    api.translations.getAvailableTranslations().then(setTranslations);
  }, []);

  return {
    translations
  }
}