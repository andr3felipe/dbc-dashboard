import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./_layouts/DefaultLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { Edit } from "./pages/Edit";
import { DashboardLayout } from "./_layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: ":id",
        element: <Edit />,
      },
    ],
  },
]);
