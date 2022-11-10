import { render } from "@testing-library/react";
import Input from ".";

describe("Input", () => {
  it("should render with value 123", () => {
    const { getByDisplayValue } = render(
      <Input value="123" onChange={() => {}} />
    );

    expect(getByDisplayValue("123")).toBeInTheDocument();
  });
});
