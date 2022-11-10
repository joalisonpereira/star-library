import { Spinner } from "react-bootstrap";
import { Container, ContainerProps } from "./styles";

export interface ButtonProps extends ContainerProps {
  loading?: boolean;
  children: React.ReactNode;
}

function Button({ loading, children, ...props }: ButtonProps) {
  return (
    <Container {...props}>
      {loading ? (
        <div className="loadingContainer">
          <Spinner animation="border" data-testid="spinner" />
          <span className="label">Carregando...</span>
        </div>
      ) : (
        children
      )}
    </Container>
  );
}

export default Button;
