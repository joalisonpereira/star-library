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
        <div className="d-flex justify-content-end mt-3">
          <Button onClick={openModal} variant="primary">
            Novo
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
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
