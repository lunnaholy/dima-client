import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout"
import { IndexLoader } from "./loaders";
import { LoginPage } from "./pages";
import { DashboardHome } from "./pages/dashboard";

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
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <DashboardHome /> }
    ]
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}