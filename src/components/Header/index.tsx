import * as S from "./styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Key, SignOut, Nut } from "@phosphor-icons/react";

export function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Aside>
        <NavLink to={"/dashboard"} aria-label="Ir para o Dashboard">
          <S.Flex>
            <Nut size={"3rem"} />
            <span>Dashboard</span>
          </S.Flex>
        </NavLink>

        <NavLink to={"/dashboard"}>
          <S.StyledButton color={"secondary"} background={"background"}>
            <Key size={"1.5rem"} />
            Dashboard
          </S.StyledButton>
        </NavLink>

        <S.StyledButton
          color={"secondary"}
          background={"background"}
          onClick={logout}
        >
          <SignOut size={"1.5rem"} />
          Logout
        </S.StyledButton>
      </S.Aside>
    </S.Container>
  );
}
