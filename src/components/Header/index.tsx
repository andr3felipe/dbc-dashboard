import { useState } from "react";
import * as S from "./styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Key, SignOut, Nut } from "@phosphor-icons/react";

export function Header() {
  const navigate = useNavigate();
  const [isAsideExpanded, setAsideExpanded] = useState("true");

  const toggleAside = () => {
    setAsideExpanded((state) => (state === "true" ? "false" : "true"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Aside expanded={isAsideExpanded}>
        <S.Flex onClick={toggleAside}>
          <Nut size={"3rem"} />
          {isAsideExpanded === "true" && <S.Logo>Dashboard</S.Logo>}
        </S.Flex>

        <NavLink to={"/dashboard"}>
          <S.StyledButton color={"secondary"} background={"background"}>
            <Key size={"1.5rem"} />
            {isAsideExpanded === "true" && "Dashboard"}
          </S.StyledButton>
        </NavLink>

        <S.StyledButton
          color={"secondary"}
          background={"background"}
          onClick={logout}
        >
          <SignOut size={"1.5rem"} />
          {isAsideExpanded === "true" && "Logout"}
        </S.StyledButton>
      </S.Aside>
    </S.Container>
  );
}
