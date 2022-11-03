import styled from "styled-components";

export interface ContainerProps {}

export const Container = styled.div<ContainerProps>`
  height: 100%;
  > .children {
    height: 100%;
    padding-top: ${(props) => props.theme.headerHeight}px;
  }
  > .btn-logout {
    position: fixed;
    bottom: ${(props) => props.theme.safeMargin * 2}px;
    right: ${(props) => props.theme.safeMargin * 2}px;
  }
`;

export const Header = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  height: ${(props) => props.theme.headerHeight}px;
  display: flex;
  align-items: center;
  position: fixed;
  .logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 250px;
    img {
      width: 40px;
      height: 40px;
    }
    h1 {
      margin: 0;
      padding: 0;
      font-size: 30px;
      color: ${(props) => props.theme.basic};
      margin-left: ${(props) => props.theme.safeMargin}px;
      font-weight: bold;
    }
  }
`;
