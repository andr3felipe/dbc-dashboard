import styled from "styled-components";
import { ButtonProps } from ".";

type StyledButtonProps = Pick<
  ButtonProps,
  "color" | "background" | "border" | "width"
>;

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${({ theme }) => theme.radii.small};
  color: ${({ color, theme }) => theme.colors[color]};
  background-color: ${({ background, theme }) => theme.colors[background]};
  padding: 0.25rem 1rem;
  border: ${({ border, theme }) =>
    border ? `1px solid ${theme.colors[border]}` : "1px solid transparent"};

  ${({ width }) => width && `width: ${width}`};

  font-weight: 500;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    transform: scale(1.01);
  }
`;
