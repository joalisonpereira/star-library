import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "src/components/Layout";
import { Table } from "react-bootstrap";
import { Container } from "./styles";
import Button from "src/components/Button";
import { UserActions } from "src/store/slices/users";
import ModalUser from "./ModalUser";

export interface UserProps {}

function User({}: UserProps) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(UserActions.fetch());
  }, [dispatch]);

  function openModal() {
    dispatch(UserActions.setModal(true));
  }

  function onRemove(id: number) {
    dispatch(UserActions.remove(id));
  }

  return (
    <Layout>
      <ModalUser />
      <Container className="container">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h3>Usuários</h3>
          <Button onClick={openModal} variant="primary" data-testid="add">
            Novo
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Livros</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.books?.length}</td>
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

export default User;
