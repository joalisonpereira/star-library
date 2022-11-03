import { useFormik } from "formik";
import { FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { BookActions } from "src/store/slices/books";
import { Container, ContainerProps } from "./styles";

export interface ModalBookProps extends ContainerProps {}

function ModalBook(props: ModalBookProps) {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.books);

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
    },
    onSubmit: (values) => {
      dispatch(BookActions.add(values));
    },
  });

  // useEffect(() => {
  //   if (!modal) {
  //     formik
  //       .setValues({
  //         name: "",
  //         email: "",
  //         password: "",
  //       })
  //       .catch(() => {});
  //   }
  // }, [modal, formik]);

  function closeModal() {
    dispatch(BookActions.setModal(false));
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
            <label className="text-white">Autor</label>
            <Input
              type="text"
              placeholder="Livro"
              onChange={formik.handleChange("author")}
              value={formik.values.author}
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

export default ModalBook;
