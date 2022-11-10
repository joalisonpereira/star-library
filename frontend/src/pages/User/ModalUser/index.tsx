import { useFormik } from "formik";
import { FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { UserActions } from "src/store/slices/users";
import { Container, ContainerProps } from "./styles";

export interface ModalUserProps extends ContainerProps {}

function ModalUser(props: ModalUserProps) {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.users);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(UserActions.add(values));
    },
  });

  function closeModal() {
    dispatch(UserActions.setModal(false));
  }

  return (
    <Container {...props} show={modal} onHide={closeModal}>
      <Container.Header closeButton>Usuário</Container.Header>
      <form onSubmit={formik.handleSubmit}>
        <Container.Body>
          <FormGroup>
            <label className="text-white">Nome</label>
            <Input
              type="text"
              placeholder="Nome"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
            />
          </FormGroup>
          <FormGroup>
            <label className="text-white">Email</label>
            <Input
              type="email"
              placeholder="Email"
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
        </Container.Body>
        <Container.Footer>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Container.Footer>
      </form>
    </Container>
  );
}

export default ModalUser;
