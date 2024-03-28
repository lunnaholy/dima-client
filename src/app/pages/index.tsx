import { Button, Input, Link } from "@nextui-org/react";

export function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[url(/Bg.png)]">
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-[8px] md:min-w-[515px]">
          <h3>Вход</h3>
          <span>в кабинет</span>
          <div className="mt-2">
            <Input
              label="Email"
              placeholder="Введите ваш Email"
              variant="bordered"
            />
          </div>
          <div className="mt-0">
            <Input
              label="Пароль"
              placeholder="Введите ваш пароль"
              type="password"
              variant="bordered"
            />
          </div>
          <div className="mt-4">
            <Button color="success" className="w-full font-semibold">Войти</Button>
          </div>
          <div className="mt-4 flex flex-col gap-0 items-center justify-center font-semibold">
            <span>Нет аккаунта?</span>
            <Link color="success" className="underline ">Зарегистрируйтесь</Link>
          </div>
        </div>
      </div>
    </>
  )
}