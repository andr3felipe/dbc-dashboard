import styled, { css } from "styled-components";
import { Eye as eye, EyeSlash as eyeSlash } from "@phosphor-icons/react";

export const Container = styled.main`
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  width: 100%;

  margin: 2rem;

  @media (max-width: 768px) {
    margin: 0 auto;
    padding: 0.5rem;
  }
`;

export const UserData = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.large};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
  padding: 2rem;
  width: fit-content;
  margin: 0 auto;
`;

export const DataType = styled.span`
  font-weight: 600;
`;

export const Data = styled.p<{ width?: string; transform?: "lowercase" }>`
  text-transform: capitalize;

  ${({ transform }) =>
    transform === "lowercase" &&
    css`
      text-transform: lowercase;
    `}

  ${({ width }) =>
    width &&
    css`
      min-width: ${width}px;
    `}
`;

export const Flex = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-flow: row wrap;
  justify-content: center;

  ${({ gap }) =>
    gap &&
    css`
      gap: ${gap}rem;
    `}
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Section = styled.section`
  margin-top: 2rem;
`;

export const Eye = styled(eye)`
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EyeSlash = styled(eyeSlash)`
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
