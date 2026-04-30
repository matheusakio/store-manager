import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TextField } from "./index";

describe("TextField", () => {
  it("renders label", () => {
    const { getByText } = render(
      <TextField
        label="Name"
        value=""
        onChangeText={jest.fn()}
      />
    );
    expect(getByText("Name")).toBeTruthy();
  });

  it("renders placeholder", () => {
    const { getByPlaceholderText } = render(
      <TextField
        label="Name"
        value=""
        onChangeText={jest.fn()}
        placeholder="Enter name"
      />
    );
    expect(getByPlaceholderText("Enter name")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TextField
        label="Name"
        value=""
        onChangeText={onChangeText}
        placeholder="Enter name"
      />
    );

    const input = getByPlaceholderText("Enter name");
    fireEvent.changeText(input, "John");
    expect(onChangeText).toHaveBeenCalledWith("John");
  });

  it("displays error message when provided", () => {
    const { getByText } = render(
      <TextField
        label="Name"
        value=""
        onChangeText={jest.fn()}
        error="Name is required"
      />
    );
    expect(getByText("Name is required")).toBeTruthy();
  });
});
