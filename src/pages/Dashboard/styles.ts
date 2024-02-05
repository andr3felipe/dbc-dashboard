import styled from "styled-components";

export const Container = styled.main`
  max-width: 90rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 auto;
  padding: 0.5rem;

  a {
    text-decoration: none;
  }

  @media (max-width: 425px) {
    width: 70%;
    padding: 0;
  }
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
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  margin: 0 auto;
  margin-block: 1rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.large};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);

  & img {
    margin-left: 1.5rem;
  }

  & p {
    margin-right: 1.5rem;
  }

  & span {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
  }

  @media (max-width: 425px) {
    display: block;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const InfosTable = styled.div`
  display: flex;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  margin: 0 auto;
  padding: 1.5rem;
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);

  background-color: ${({ theme }) => theme.colors.white};

  & h2 {
    font-size: 1rem;
    margin-left: 1.5rem;
  }
`;

export const Table = styled.div`
  display: flex;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
`;

export const DataGridStyle = {
  border: "none",
  paddingInline: "2.5rem",
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.large};
  box-shadow: 0px 10px 60px 0px rgba(226, 236, 249, 0.5);
  padding: 2rem;
  width: 300px;

  & p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  & button {
    margin-right: 1rem;
  }
`;
