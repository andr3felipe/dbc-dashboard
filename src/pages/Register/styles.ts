import { TextField } from "@mui/material";

import styled from "styled-components";

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
  width: 40%;
  max-width: 50%;
  margin: auto;
  padding: 20px;
  gap: 1rem;
`;

export const StyledTitle = styled.h1`
text-align: center;
margin-bottom: 1rem;`

export const StyledText = styled.p`
text-align: center;
color: black;
`;

export const StyledTextField = styled(TextField)`
`;