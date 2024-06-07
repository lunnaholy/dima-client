import { Outlet } from "react-router-dom";
import LayoutNavbar from "../components/navbar/navbar";
import useDarkMode from "use-dark-mode";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { api } from "../../api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setUser } from "../store/user/reducer";

export function Layout({ children }: { children?: React.ReactNode; }) {
  const darkMode = useDarkMode(false);
  const dispatch = useAppDispatch(); 

  useEffect(() => {
    api.auth.me().then(data => {
      dispatch(setUser(data.data));
    });
  }, []);

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
            {children || <Outlet />}
          </div>
        </div>
      </main>
    </>
  );
}