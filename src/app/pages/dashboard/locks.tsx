import { Lock } from "../../components/lock/lock";

export function LocksPage() {
  const locks: Lock[] = [
    { id: 1, displayName: "Замок 1" },
    { id: 2, displayName: "Замок 2" },
    { id: 3, displayName: "Замок 3" },
    { id: 4, displayName: "Замок 4" },
    { id: 5, displayName: "Замок 5" },
    { id: 6, displayName: "Замок 6" },
    { id: 7, displayName: "Замок 7" },
    { id: 8, displayName: "Замок 8" },
    { id: 9, displayName: "Замок 9" },
    { id: 10, displayName: "Замок 10" },
    { id: 11, displayName: "Замок 11" },
    { id: 12, displayName: "Замок 12" },
    { id: 13, displayName: "Замок 13" },
    { id: 14, displayName: "Замок 14" },
    { id: 15, displayName: "Замок 15" },
    { id: 16, displayName: "Замок 16" },
    { id: 17, displayName: "Замок 17" },
    { id: 18, displayName: "Замок 18" },
    { id: 19, displayName: "Замок 19" },
    { id: 20, displayName: "Замок 20" },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 p-2 md:p-4">
        <span className="text-2xl font-bold">Замки</span>
        <span className="text-sm max-w-96">
          Тут вы можете управлять теми замками, для которых у Вас есть доступ.
        </span>
        <div className="flex flex-row flex-wrap gap-2 max-w-[720px] p-2 mt-2">
          {locks.map((lock) => (
            <Lock key={lock.id} lock={lock} />
          ))}
        </div>
      </div>
    </>
  )
}