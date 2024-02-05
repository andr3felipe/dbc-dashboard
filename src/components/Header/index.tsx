import * as S from "./styles";
import Logo from "../../assets/setting 1.svg";
import Logout from "../../assets/sair-do-usuario.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.Container>
      <S.Aside>
        <S.Title>
          <img src={Logo} alt="" />
          <h1>Dashboard</h1>
        </S.Title>
        <S.StyledButton color={"secondary"} background={"background"}>
          <img src={Logout} alt="" />
          <span>Dashboard</span>
        </S.StyledButton>
        <S.StyledButton
          color={"secondary"}
          background={"background"}
          onClick={logout}
        >
          <img src={Logout} alt="" />
          <span>Logout</span>
        </S.StyledButton>
      </S.Aside>
    </S.Container>
  );
}
