import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout"
import { IndexLoader } from "./loaders";
import { LoginPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Outlet /></>,
    children: [
      { path: "/",
        loader: IndexLoader,
        element: <LoginPage />
      }
    ]
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}