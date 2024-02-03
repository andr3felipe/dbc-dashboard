import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import * as S from "./styles";

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('E-mail:', email, 'Senha: ', password);
  }

  const navigateToRegister = () => {
    navigate("/register");
  }

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmit}>
        <S.StyledTitle>Login</S.StyledTitle>
        <S.StyledTextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button children="Login" color="background" background="text" type="submit"></Button>
        <S.StyledLink href="/">Esqueceu a senha?</S.StyledLink>
        <Button children="Crie uma conta" color="background" background="text" onClick={navigateToRegister}></Button>
      </S.LoginForm>
    </S.Container>
  );
}
