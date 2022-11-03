import { useFormik } from "formik";
import { FormGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Button from "src/components/Button";
import Input from "src/components/Input";
import Layout from "src/components/Layout";
import { AuthActions } from "src/store/slices/auth";
import { Container } from "./styles";

export interface LoginProps {}

function Login({}: LoginProps) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(AuthActions.signIn(values));
    },
  });

  return (
    <Layout>
      <Container className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <label className="text-white">Email</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <label className="text-white">Senha</label>
                <Input
                  type="password"
                  placeholder="**********"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                />
              </FormGroup>
              <div className="d-grid mt-5">
                <Button variant="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Login;
