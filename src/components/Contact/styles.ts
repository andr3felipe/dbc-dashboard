import styled, { css } from "styled-components";

export const Container = styled.article`
  margin-top: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.large};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
  padding: 2rem;
`;

export const Flex = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-flow: row wrap;
  justify-content: space-between;

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

  @media (max-width: 450px) {
    flex-direction: column;
    gap: 0;
    margin-bottom: 1rem;
  }
`;

export const DataType = styled.h4`
  font-weight: 600;
`;

export const Data = styled.p<{ width?: string }>`
  text-transform: capitalize;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;
