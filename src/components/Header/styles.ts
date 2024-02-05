import styled from "styled-components";
import { Button } from "../Button";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Logo = styled.span`
  font-weight: bold;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
`;

export const Aside = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  width: 15rem;
  height: 100vh;
  float: left;
  padding: 1rem;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.large};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;
