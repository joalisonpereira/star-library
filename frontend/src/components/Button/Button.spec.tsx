import { render } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  it("should render button with jest title", () => {
    const { getByText } = render(<Button>Test</Button>);

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render loading button", () => {
    const { getByText, getByTestId } = render(<Button loading>Test</Button>);

    expect(getByText("Carregando...")).toBeInTheDocument();

    expect(getByTestId("spinner")).toBeInTheDocument();
  });
});
