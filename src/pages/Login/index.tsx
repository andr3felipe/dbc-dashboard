import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import * as S from "./styles";

export function Login() {

  interface UserData {
    login: string;
    senha: string;
  }

  const { register, handleSubmit, reset } = useForm<UserData>();
  const navigate = useNavigate();

  async function logUser(userData: UserData) {
    try {
      const response = await fetch("http://vemser-dbc.dbccompany.com.br:39000/vemser/pessoa-api-back/auth", {
        method: "POST",
        headers: {
          "Content-Type": "Aplication/json",
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        console.log(response.status);

        if (response.status === 403) {
          throw new Error('Login ou senha incorretos');
        }
        else throw new Error('Erro inesperado. Tente mais tarde.')

      }

      const token = await response.text();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
    catch(error) {
      console.log(error);
    }
  }

  function onSubmit(data: UserData) {
    logUser(data);
    reset();
  }

  const navigateToRegister = () => {
    navigate("/register");
  }

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <S.StyledTitle>Login</S.StyledTitle>
        <S.StyledTextField
          label="Login"
          variant="outlined"
          type="text"
          {...register('login', { required: true })}
        />
        <S.StyledTextField
          label="Senha"
          variant="outlined"
          type="password"
          {...register('senha', { required: true })}
        />
        <Button children="Entrar" color="background" background="text" type="submit"></Button>
        <S.StyledLink href="/">Esqueceu a senha?</S.StyledLink>
        <Button children="Crie uma conta" color="background" background="text" onClick={navigateToRegister}></Button>
      </S.LoginForm>
    </S.Container>
  );
}
