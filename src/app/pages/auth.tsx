import { Button, Input } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeToggler } from "../components/darkmode/darkModeToggler";
import { api } from "../../api";
import { toast } from "react-toastify";

export function LoginPage() {
  const navigate = useNavigate();
  const [displayPassword, setDisplayPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: localStorage.getItem("username") || "",
      password: "",
    },
  });

  const onSubmit = useCallback((data: any) => {
    if (data.password.length === 0) {
      localStorage.setItem("username", data.username);
      setDisplayPassword(true);
    } else {
      api.auth
        .login({
          username: data.username,
          password: data.password,
        })
        .then(() => {
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error(err.status);
        });
    }
  }, []);

  const resetEmail = () => {
    localStorage.removeItem("username");
    setDisplayPassword(false);
  };

  useEffect(() => {
    localStorage.removeItem("access_token");
    if (localStorage.getItem("username")) setDisplayPassword(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[url(/Bg.png)] bg-cover bg-center">
      <motion.div
        className="bg-background rounded-xl p-8 shadow flex flex-col gap-2 md:min-w-[515px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h2>Вход</h2>
        <span className="font-medium">в личный кабинет коворкинга</span>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <Input
            label="Имя пользователя"
            placeholder="Введите имя пользователя"
            variant="bordered"
            isDisabled={displayPassword}
            {...register("username", { required: true })}
            className="mb-2"
          />
          {errors.username && <span>Имя пользователя обязательно</span>}
          <AnimatePresence>
            {displayPassword && (
              <motion.div
                className="mt-0"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  label="Пароль"
                  placeholder="Введите ваш пароль"
                  type="password"
                  variant="bordered"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>Пароль обязателен</span>}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-4 flex gap-4">
            <AnimatePresence>
              {displayPassword && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    color="primary"
                    variant="flat"
                    className="w-full font-semibold"
                    onClick={resetEmail}
                  >
                    Это не моё имя пользователя
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <Button color="primary" className="w-full font-semibold" type="submit">
              Войти
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-0 items-center justify-center font-semibold">
            <span>Нет можете войти?</span>
            <Link className="text-primary" to="/reset">
              Восстановить аккаунт
            </Link>
          </div>
        </form>
      </motion.div>
      <br />
      <DarkModeToggler collapsed={false} />
    </div>
  );
}