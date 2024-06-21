import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/mainLayout";
import { DashboardLoader, IndexLoader } from "./loaders/mainLoaders";
import { LoginPage } from "./pages/auth";
import { DashboardHome } from "./pages/dashboard/dashboard";
import { ResetPage } from "./pages/reset";
import { Provider } from "react-redux";
import rootStore from "./store";
import { AuthLayout } from "./layout/authLayout";
import 'react-toastify/dist/ReactToastify.css';
import { LocationsPage } from "./pages/dashboard/locations";
import { LocationOfficesPage } from "./pages/dashboard/locations/[id]/offices";
import { UsersPage } from "./pages/dashboard/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
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
    loader: DashboardLoader,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/locations", element: <LocationsPage /> },
      { path: "/dashboard/locations/:id/offices", element: <LocationOfficesPage /> },
      { path: "/dashboard/users", element: <UsersPage /> },
      // { path: "/dashboard/locks", element: <LocksPage /> },
      // { path: "/dashboard/print", element: <PrintPage /> },
      // { path: "/dashboard/tickets", element: <TicketsPage /> },
      // { path: "/dashboard/tickets/1", element: <TicketPage /> },
      // { path: "/dashboard/employees", element: <EmployeesPage /> },
      // { path: "/dashboard/payments", element: <PaymentPage /> },
      // { path: "/dashboard/payments/1", element: <PaymentInfoPage /> },
      // { path: "/dashboard/documents", element: <DocumentsPage /> },
      // { path: "/dashboard/test", element: <TestPage /> },
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