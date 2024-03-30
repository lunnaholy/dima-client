import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout"
import { IndexLoader } from "./loaders";
import { LoginPage } from "./pages";
import { DashboardHome } from "./pages/dashboard";
import {  PrintPage } from "./pages/dashboard/print";
import { LocksPage } from "./pages/dashboard/locks";

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
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/locks", element: <LocksPage /> },
      { path: "/dashboard/print", element: <PrintPage /> }
    ]
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}