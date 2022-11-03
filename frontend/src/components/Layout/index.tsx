import { Container, Header } from "./styles";
import Logo from "src/assets/star.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AuthActions } from "src/store/slices/auth";

export interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(AuthActions.signOut());
  }

  return (
    <Container>
      <Header>
        <div className="container">
          <Link className="logo" to="/">
            <img src={Logo} alt="Start Library" />
            <h1>Star Library</h1>
          </Link>
        </div>
      </Header>
      <div className="children">{children}</div>
      <Button className="btn-logout" onClick={onLogout} variant="danger">
        Sair
      </Button>
    </Container>
  );
}

export default Layout;
