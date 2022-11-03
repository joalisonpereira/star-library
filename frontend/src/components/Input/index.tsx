import { Container, ContainerProps } from "./styles";

export interface InputProps extends ContainerProps {}

function Input(props: InputProps) {
  return <Container {...props} />;
}

export default Input;
