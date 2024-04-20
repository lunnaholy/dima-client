import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { Layout } from "./layout/layout"
import { IndexLoader } from "./loaders/mainLoaders";
import { LoginPage } from "./pages/auth";
import { DashboardHome } from "./pages/dashboard/dashboard";
import {  PrintPage } from "./pages/dashboard/print";
import { LocksPage } from "./pages/dashboard/locks";
import { TicketsPage } from "./pages/dashboard/tickets";
import { TicketPage } from "./pages/dashboard/ticket/ticket";
import { ResetPage } from "./pages/reset";
import { EmployeesPage } from "./pages/dashboard/employees";
import { TestPage } from "./pages/dashboard/test";
import { Provider } from "react-redux";
import rootStore from "./store";
import { PaymentPage } from "./pages/dashboard/payments";
import { PaymentInfoPage } from "./pages/dashboard/payment/payment";
import { DocumentsPage } from "./pages/dashboard/documents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <main id="main"><Outlet /></main>,
    children: [
      { path: "/",
        loader: IndexLoader,
        element: <LoginPage />
      },
      {
        path: "/reset",
        loader: IndexLoader,
        element: <ResetPage />
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
      { path: "/dashboard/tickets", element: <TicketsPage /> },
      { path: "/dashboard/tickets/1", element: <TicketPage /> },
      { path: "/dashboard/employees", element: <EmployeesPage /> },
      { path: "/dashboard/payments", element: <PaymentPage /> },
      { path: "/dashboard/payments/1", element: <PaymentInfoPage /> },
      { path: "/dashboard/documents", element: <DocumentsPage /> },
      { path: "/dashboard/test", element: <TestPage /> },
    ]
  }
]);

export function App() {
  return (
    <Provider store={rootStore}>
      <RouterProvider router={router} />
    </Provider>
  )
}