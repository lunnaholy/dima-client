import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout/layout"
import { IndexLoader } from "./loaders/mainLoaders";
import { LoginPage } from "./pages/auth";
import { DashboardHome } from "./pages/dashboard/dashboard";
import {  PrintPage } from "./pages/dashboard/print";
import { LocksPage } from "./pages/dashboard/locks";
import { TicketsPage } from "./pages/dashboard/tickets";

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
      { path: "/dashboard/print", element: <PrintPage /> },
      { path: "/dashboard/tickets", element: <TicketsPage /> }
    ]
  }
]);

export function App() {
  return (
    <RouterProvider router={router} />
  )
}