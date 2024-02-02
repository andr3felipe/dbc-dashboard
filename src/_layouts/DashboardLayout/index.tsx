import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DashboardLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
