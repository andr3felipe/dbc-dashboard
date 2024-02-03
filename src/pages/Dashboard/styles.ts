import styled from "styled-components";

export const Container = styled.main`
    max-width: 80rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.text}
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;