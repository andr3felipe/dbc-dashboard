import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as S from "./styles";
import Alert from "@mui/material/Alert";

export function Login() {
  interface UserData {
    login: string;
    senha: string;
  }

  interface AlertMessage {
    severity: "error" | "warning";
    message: string;
  }

  const { register, handleSubmit } = useForm<UserData>();
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

  async function logUser(userData: UserData) {
    try {
      const response = await fetch(
        "http://vemser-dbc.dbccompany.com.br:39000/vemser/pessoa-api-back/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        console.log(response.status);

        const errorAlertMessage =
          response.status === 403
            ? "Login ou senha incorretos"
            : "Erro inesperado. Tente mais tarde.";

        setAlertMessage({
          severity: response.status === 403 ? "error" : "warning",
          message: errorAlertMessage,
        });
        return;
      }

      const token = await response.text();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setAlertMessage({
        severity: "error",
        message: "Erro inesperado. Tente mais tarde.",
      });
    }
  }

  function onSubmit(data: UserData) {
    logUser(data);
  }

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <S.StyledTitle>Login</S.StyledTitle>
        <S.StyledTextField
          label="Login"
          variant="outlined"
          type="text"
          {...register("login", { required: true })}
        />
        <S.StyledTextField
          label="Senha"
          variant="outlined"
          type="password"
          {...register("senha", { required: true })}
        />
        <S.StyledButton
          children="Entrar"
          color="background"
          background="text"
          type="submit"
        ></S.StyledButton>
        <S.StyledLink href="/">Esqueceu a senha?</S.StyledLink>
        <S.StyledButton
          children="Crie uma conta"
          color="background"
          background="text"
          onClick={navigateToRegister}
        ></S.StyledButton>
        {showAlerts && alertMessage && (
          <Alert severity={alertMessage?.severity}>
            {alertMessage?.message}
          </Alert>
        )}
      </S.LoginForm>
    </S.Container>
  );
}
