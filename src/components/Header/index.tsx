import { useState } from "react";
import * as S from "./styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Key, SignOut, Nut } from "@phosphor-icons/react";

export function Header() {
  const navigate = useNavigate();
  const [isAsideExpanded, setAsideExpanded] = useState(true);

  const toggleAside = () => {
    setAsideExpanded(!isAsideExpanded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Aside expanded={isAsideExpanded}>
        <NavLink to={"/dashboard"} aria-label="Ir para o Dashboard">
          <S.Flex onClick={toggleAside}>
            <Nut size={"3rem"} />
            {isAsideExpanded && <span>Dashboard</span>}
          </S.Flex>
        </NavLink>

        <NavLink to={"/dashboard"}>
          <S.StyledButton color={"secondary"} background={"background"}>
            <Key size={"1.5rem"} />
            {isAsideExpanded && "Dashboard"}
          </S.StyledButton>
        </NavLink>

        <S.StyledButton
          color={"secondary"}
          background={"background"}
          onClick={logout}
        >
          <SignOut size={"1.5rem"} />
          {isAsideExpanded && "Logout"}
        </S.StyledButton>
      </S.Aside>
    </S.Container>
  );
}
