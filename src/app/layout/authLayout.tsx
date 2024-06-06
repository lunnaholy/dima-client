import { Outlet } from "react-router-dom"
import useDarkMode from "use-dark-mode";
import { ToastContainer } from "react-toastify";

export function AuthLayout({ children }: { children?: React.ReactNode; }) {
  const darkMode = useDarkMode(false);

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
        <>
          {children || <Outlet />}
        </>
      </main >
    </>
  );
}
