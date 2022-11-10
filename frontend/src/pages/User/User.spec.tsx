import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import User from ".";

describe("pages/User", () => {
  it("should render user page", () => {
    const { getAllByText } = render(
      <App>
        <BrowserRouter>
          <User />
        </BrowserRouter>
      </App>
    );

    getAllByText("Usuários").forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it("should open modal", () => {
    const { getByText, getByTestId } = render(
      <App>
        <BrowserRouter>
          <User />
        </BrowserRouter>
      </App>
    );

    userEvent.click(getByTestId("add"));

    expect(getByText("Enviar")).toBeInTheDocument();
  });
});
