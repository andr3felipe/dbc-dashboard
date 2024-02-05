import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import * as S from "./styles";
import Alert from '@mui/material/Alert';

export function Register() {

  interface UserData {
    login: string;
    senha: string;
  }

  interface AlertMessage {
    severity: "error" | "warning";
    message: string | any;
  }

  const { register, handleSubmit, reset } = useForm<UserData>();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      setShowAlerts(true);
      setTimeout(() => {
        setShowAlerts(false);
        setAlertMessage(null);
      }, 3500);
    }
  }, [alertMessage]);

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

        setAlertMessage({ severity: 'error', message: message });
      }

      else {
        const token = await response.text();
        localStorage.setItem("token", token);
        navigate("/");
      }
    }
    catch (error: any) {
      setAlertMessage({ severity: 'error', message: error.message });
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
        <S.StyledButton children="Cadastrar conta" color="background" background="text" type="submit"></S.StyledButton>
        <S.StyledText>Já tem uma conta?</S.StyledText>
        <S.StyledButton children="Fazer Login" color="background" background="text" onClick={navigateToLogin}></S.StyledButton>
        {showAlerts && alertMessage && <Alert severity={alertMessage?.severity}>{alertMessage?.message}</Alert>}
      </S.LoginForm>
    </S.Container>
  );
}