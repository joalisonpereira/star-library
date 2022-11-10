import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "src/components/Layout";
import { Table } from "react-bootstrap";
import { Container } from "./styles";
import Button from "src/components/Button";
import { BookActions } from "src/store/slices/books";
import ModalBook from "./ModalBook";

export interface BookProps {}

function Book({}: BookProps) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(BookActions.fetch());
  }, [dispatch]);

  function openModal() {
    dispatch(BookActions.setModal(true));
  }

  function onRemove(id: number) {
    dispatch(BookActions.remove(id));
  }

  return (
    <Layout>
      <ModalBook />
      <Container className="container">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h3>Livros</h3>
          <Button onClick={openModal} variant="primary" data-testid="add">
            Novo
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>
                  <Button onClick={() => onRemove(item.id)} variant="danger">
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

export default Book;
