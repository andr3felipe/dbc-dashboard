import styled from "styled-components";

export const Container = styled.main`
  max-width: 90rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  & span {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1.8rem;
  }
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
  border-radius: 2rem;
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
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
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
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`;

export const DataGridStyle = {
  border: "none",
  paddingInline: "2.5rem",
};

export const Aside = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  width: 15rem;
  height: 100vh;
  float: left;
  padding: 1rem;
  flex-direction: column;
  margin-right: 10rem;

  .LogoutNav {
    text-decoration: none;
  }

  .title {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    margin: 0;
    border-radius: 1rem;
    border: none;
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }

    & img {
      width: 1rem;
    }
  }

  .menu {
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
    /* background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white}; */

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }

    & img {
      width: 1rem;
    }
  }
`;
