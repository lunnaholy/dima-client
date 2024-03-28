import { Outlet } from "react-router-dom";
import LayoutNavbar from "../components/navbar/navbar";
import useDarkMode from "use-dark-mode";

export function Layout({ children }: { children?: React.ReactNode }) {
  const darkMode = useDarkMode(false);
  
  return (
    <>
      <main id="main" className={`${darkMode.value ? 'dark bg-black' : 'bg-zinc-100'} text-foreground`} >
        {/* <ToastContainer
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
        /> */}
        <div className="layout">
          <LayoutNavbar />
          <div className="layout__content max-h-[calc(100vh-32px)]">
            { children || <Outlet /> }
          </div>
        </div>
      </main>
    </>
  )
}