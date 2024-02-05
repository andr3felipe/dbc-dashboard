import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import * as S from "./styles";

export function DashboardLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <S.Container>
      <Header />
      <Outlet />
    </S.Container>
  );
}
