import { TextField } from "@mui/material";

import styled from "styled-components";
import { Button } from "../../components/Button";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
`;

export const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  text-align: center;
  color: black;
`;

export const StyledTextField = styled(TextField)``;

export const StyledButton = styled(Button)`
  height: 56px;
`;
