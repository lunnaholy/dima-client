import { useTranslation } from "react-i18next";
import useTranslations from "../../../../hooks/useTranslations";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Translation as TranslationApi } from "../../../../api/lang";
import { Translation } from "../../../../static/translationCodes";
import { useEffect, useState } from "react";

export function TranslationSelectorModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void }) {
  const { t, i18n } = useTranslation();
  const { translations } = useTranslations();
  const [search, setSearch] = useState<string>("");
  const [translationList, setTranslationList] = useState<TranslationApi[]>([]);

  useEffect(() => {
    setTranslationList(translations.filter((t) => t.displayName.toLowerCase().includes(search.toLowerCase())));
  }, [search, translations]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {t(Translation.selectLanguage)}
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                // Поменять на Translation.searchLanguage
                label={ t(Translation.selectLanguage) }
                onChange={(e) => setSearch(e.target.value)}
                variant="bordered"
              />
              <div className="max-h-56 overflow-auto">
                <div className="flex flex-col gap-2">
                  {translationList.map((t) => (
                    <>
                      <div className="flex flex-row justify-between items-center cursor-pointer p-2 bg-zinc-200 rounded-lg" onClick={() => {
                        i18n.changeLanguage(t.code);
                        localStorage.setItem("lang", t.code);
                        onOpenChange();
                      }}>
                        <div className="w-8 h-8 overflow-clip rounded-full shadow-sm" dangerouslySetInnerHTML={{ __html: t.svg }} />
                        <span className="font-semibold">{ t.displayName }</span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>
                { t(Translation.close) }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}