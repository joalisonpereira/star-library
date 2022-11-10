import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import Layout from ".";

describe("Layout", () => {
  it("should render title labels", () => {
    const randomLabel = `Label-${Math.random()}`;

    const { getByText, getAllByText } = render(
      <App>
        <BrowserRouter>
          <Layout>{randomLabel}</Layout>
        </BrowserRouter>
      </App>
    );

    expect(getByText(randomLabel)).toBeInTheDocument();

    getAllByText("Star Library").forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
