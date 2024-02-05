import * as S from "./styles";

import { useNavigate } from "react-router-dom";

export function NotFound() {

  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 5000);


  return (
    <S.Container>
      <S.StyledText>404 | Página Não Encontrada!</S.StyledText>
      <S.StyledParagraph>Estamos redirecionando para a página inicial...</S.StyledParagraph>
    </S.Container>
  );
}
