import styled, { css } from "styled-components";
import inputMask from "react-input-mask";

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  h2 {
    margin-bottom: 2rem;
    max-width: 95%;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1rem;
      margin-bottom: 0;
    }
  }

  @media (max-height: 768px) {
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

export const NormalInput = styled.input<{ width?: string }>`
  padding: 0.25rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  width: ${({ width }) =>
    width &&
    css`
      ${width};
    `};

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const InputMask = styled(inputMask)<{ width?: string }>`
  padding: 0 0.25rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  width: ${({ width }) =>
    width &&
    css`
      ${width};
    `};

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.colors["error-text"]};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  text-align: center;
  min-height: 1.125rem;
`;

export const Label = styled.label`
  font-weight: 600;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
