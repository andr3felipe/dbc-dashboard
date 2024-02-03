import styled from "styled-components";

export const Container = styled.main`
  max-width: 80rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Infos = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Users = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  margin-block: 1rem;
  width: 100%;

  & img {
    margin-left: 1.5rem;
  }

  & p {
    color: ${({ theme }) => theme.colors.secondary};
    margin-right: 1.5rem;
  }

  & span {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const InfosTable = styled.div`
  display: flex;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 1.5rem;

  background-color: ${({ theme }) => theme.colors.white};

  & h2 {
    font-size: 1rem;
    margin-left: 1.5rem;
  }
`;

export const Table = styled.div`
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const DataGridStyle = {
  borderRadius: "8px",
  border: "none",
  paddingInline: "2.5rem",
};
