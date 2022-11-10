import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import Book from ".";

describe("pages/Book", () => {
  it("should render book page", () => {
    const { getAllByText } = render(
      <App>
        <BrowserRouter>
          <Book />
        </BrowserRouter>
      </App>
    );

    getAllByText("Livros").forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it("should open modal", () => {
    const { getByText, getByTestId } = render(
      <App>
        <BrowserRouter>
          <Book />
        </BrowserRouter>
      </App>
    );

    userEvent.click(getByTestId("add"));

    expect(getByText("Enviar")).toBeInTheDocument();
  });

  it("should create a book", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <App>
        <BrowserRouter>
          <Book />
        </BrowserRouter>
      </App>
    );

    userEvent.click(getByTestId("add"));

    const nameInput = getByPlaceholderText("Nome");

    userEvent.type(nameInput, "Teste Livro");

    const authorInput = getByPlaceholderText("Autor");

    userEvent.type(authorInput, "Teste autor");

    expect(nameInput).toHaveValue("Teste Livro");

    expect(authorInput).toHaveValue("Teste autor");
  });
});
