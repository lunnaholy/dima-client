import { Button, Input, Link } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";

export function LoginPage() {
  const [displayPassword, setDisplayPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") || "",
    password: "",
  });

  const onSubmit = useCallback(() => {
    if(formData.password.length == 0) {
      localStorage.setItem("email", formData.email);
      location.reload();
    } else {
      console.log(formData);
    }
  }, [formData]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetEmail = () => {
    localStorage.removeItem("email");
    location.reload();
  };

  useEffect(() => {
    if(formData.email.length > 0) setDisplayPassword(true);
    else setDisplayPassword(false);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-[url(/Bg.png)] bg-cover bg-center">
        <div className="bg-white rounded-xl p-8 shadow flex flex-col gap-[8px] md:min-w-[515px]">
          <h2>Вход</h2>
          <span className="font-medium">в личный кабинет коворкинга</span>
          <div className="mt-2">
            <Input
              label="Email"
              name="email"
              placeholder="Введите ваш Email"
              variant="bordered"
              defaultValue={formData.email}
              isDisabled={displayPassword}
              onInput={onInput}
            />
          </div>
          {displayPassword && (
            <div className="mt-0">
              <Input
                label="Пароль"
                name="password"
                placeholder="Введите ваш пароль"
                type="password"
                variant="bordered"
                onInput={onInput}
              />
            </div>
          )}
          <div className="mt-4 flex gap-4">
            {displayPassword && (
              <Button color="primary" variant="flat" className="w-full font-semibold" onClick={resetEmail}>Это не мой Email</Button>
            )}
            <Button color="primary" className="w-full font-semibold" onClick={onSubmit}>Войти</Button>
          </div>
          <div className="mt-4 flex flex-col gap-0 items-center justify-center font-semibold">
            <span>Нет можете войти?</span>
            <Link color="primary" className="underline">Восстановить аккаунт</Link>
          </div>
        </div>
      </div>
    </>
  )
}