import * as S from "./styles";

import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <S.Container>
      <S.StyledText>404 | Página Não Encontrada!</S.StyledText>
      <S.StyledParagraph>
        <NavLink to={"/dashboard"}>Voltar para o Dashboard</NavLink>
      </S.StyledParagraph>
    </S.Container>
  );
}
