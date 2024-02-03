import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import * as S from "./styles";

export function Register() {

  interface UserData {
    login: string;
    senha: string;
  }

  const { register, handleSubmit, reset } = useForm<UserData>();
  const navigate = useNavigate();

  async function registerUser(userData: UserData) {
    try {
        const response = await fetch("http://vemser-dbc.dbccompany.com.br:39000/vemser/pessoa-api-back/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const data = await response.json();
        const { message } = data;

        throw new Error(message);
      }

      // MODIFICAR
      alert("Usuário criado com sucesso.")
      // MODIFICAR
      navigate("/");

      const token = await response.text();
      localStorage.setItem("token", token);
      navigate("/");
    }
    catch(error) {
      alert(error);
    }
  }

  function onSubmit(data: UserData) {
    registerUser(data);
    reset();
  }

  const navigateToLogin = () => {
    navigate("/");
  }

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <S.StyledTitle>Cadastro</S.StyledTitle>
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
        <Button children="Cadastrar conta" color="background" background="text" type="submit"></Button>
        <S.StyledText>Já tem uma conta?</S.StyledText>
        <Button children="Fazer Login" color="background" background="text" onClick={navigateToLogin}></Button>
      </S.LoginForm>
    </S.Container>
  );
}