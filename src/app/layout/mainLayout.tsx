import { Outlet, useNavigate } from "react-router-dom";
import LayoutNavbar from "../components/navbar/navbar";
import useDarkMode from "use-dark-mode";
import { ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUser } from "../store/user/reducer";
import { User } from "../../api/auth/auth";
import { Button } from "@nextui-org/react";

export function Layout({ children }: { children?: React.ReactNode; }) {
  const darkMode = useDarkMode(false);
  const dispatch = useAppDispatch();
  const [user, setDUser] = useState<User | null>(null);

  useEffect(() => {
    api.users.list();
    api.auth.me().then(data => {
      setDUser(data.data);
      dispatch(setUser(data.data));
    });
  }, []);

  const linkTelegram = useCallback(() => {
    api.auth.generateTelegramLink()
      .then(data => {
        location.href = data.data.link;
      })
      .catch(err => {
        console.error(err);
        toast.error("У нас произошли некоторые проблемы с привязкой вашего аккаунта к Telegram. Попробуйте позже или обратитесь в поддержку");
      })
  }, [user]);

  return (
    <>
      <main id="main" className={`${darkMode.value ? 'dark bg-black' : 'bg-zinc-100'} text-foreground`}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="layout">
          <LayoutNavbar />
          <div className="layout__content md:max-h-[calc(100vh-32px)]">
            {user?.telegram == 0 && (
              <div className="w-full bg-primary-100 flex flex-col gap-2 rounded-xl p-4">
                <span className="text-sm">Заметили, что у вас всё ещё не привязан Telegram. А зря - у нас есть удобный Telegram-бот, облегчающий работу с кабинетом.</span>
                <Button variant="flat" color="primary" size="sm" onClick={linkTelegram} className="mt-2 max-w-fit">Класс, хочу попробовать</Button>
              </div>
            )}
            {children || <Outlet />}
          </div>
        </div>
      </main>
    </>
  );
}