import { Gear } from "@phosphor-icons/react";
import styled from "styled-components";

export const Icon = styled(Gear)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  min-height: 46px;

  &:hover {
    font-size: 2.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
