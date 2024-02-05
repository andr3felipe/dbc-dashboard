import styled from "styled-components";
import { XCircle } from "@phosphor-icons/react";

export const CloseButton = styled(XCircle)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors["error-text"]};
  }
`;
