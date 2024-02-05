import styled from "styled-components";
import Modal from "react-modal";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`;

export const StyledModal = styled(Modal)`
  align-items: center;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
`;
