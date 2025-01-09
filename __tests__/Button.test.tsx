import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../src/app/components/Button";

describe("Button Component", () => {
  it("renders the button with the correct label", () => {
    render(<Button label="Click Me" onClick={jest.fn()} />);
    const buttonElement = screen.getByTestId("button-element");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  it("calls the onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const onClickMock = jest.fn();
    render(<Button label="Submit" onClick={onClickMock} />);
    const buttonElement = screen.getByTestId("button-element");

    await user.click(buttonElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles and classes", () => {
    render(<Button label="Styled Button" onClick={jest.fn()} />);
    const buttonElement = screen.getByTestId("button-element");
    expect(buttonElement).toHaveClass(
      "w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors"
    );
  });
});
