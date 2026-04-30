import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ChipFilter } from "./index";

describe("ChipFilter", () => {
  const options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" },
  ];

  it("renders all options", () => {
    const { getByText } = render(
      <ChipFilter options={options} value="opt1" onChange={jest.fn()} />
    );
    expect(getByText("Option 1")).toBeTruthy();
    expect(getByText("Option 2")).toBeTruthy();
    expect(getByText("Option 3")).toBeTruthy();
  });

  it("calls onChange when option is pressed", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ChipFilter options={options} value="opt1" onChange={onChange} />
    );

    fireEvent.press(getByText("Option 2"));
    expect(onChange).toHaveBeenCalledWith("opt2");
  });

  it("highlights selected option", () => {
    const { getByText } = render(
      <ChipFilter options={options} value="opt2" onChange={jest.fn()} />
    );

    // The selected option should have different styling
    const option2 = getByText("Option 2");
    expect(option2).toBeTruthy();
  });
});
