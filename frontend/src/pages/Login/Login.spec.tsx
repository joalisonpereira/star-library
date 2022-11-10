import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import Login from ".";

describe("pages/Login", () => {
  it("should render login page", () => {
    const { getByText } = render(
      <App>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </App>
    );

    expect(getByText("Login")).toBeInTheDocument();
  });

  it("should try signin", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <App>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </App>
    );

    const emailInput = getByPlaceholderText("example@email.com");

    userEvent.type(emailInput, "joalison.pereira@hotmail.com");

    const passwordInput = getByPlaceholderText("**********");

    userEvent.type(passwordInput, "1234");

    userEvent.click(getByText("Entrar"));

    await waitFor(() => {
      expect(getByTestId("spinner")).toBeInTheDocument();
    });
  });
});
