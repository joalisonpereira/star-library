import styled from "styled-components";

export interface ContainerProps {}

export const Container = styled.div<ContainerProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 30px;
    font-weight: 600;
  }
`;
