import styled, { css } from "styled-components";
import { Button, ButtonProps } from "react-bootstrap";

export interface ContainerProps extends ButtonProps {}

export const Container = styled(Button)<ContainerProps>`
  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: ${(props) => props.theme.primary};
      border-color: ${(props) => props.theme.primary};
      :link,
      :visited,
      :focus,
      :hover,
      :active {
        background-color: ${(props) => props.theme.primary} !important;
      }
    `}

  .loadingContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    .label {
      margin-left: ${(props) => props.theme.safeMargin}px;
    }
  }
`;
