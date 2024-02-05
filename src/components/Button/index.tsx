import * as S from "./styles";
import { ThemeTypeColors } from "../../@types/styled";
import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  children: React.ReactNode;
  color: keyof ThemeTypeColors;
  background: keyof ThemeTypeColors;
  border?: keyof ThemeTypeColors;
  width?: "100%";
  onClick?: () => void;
}

export function Button({ children, ...rest }: ButtonProps) {
  return <S.StyledButton {...rest}>{children}</S.StyledButton>;
}
