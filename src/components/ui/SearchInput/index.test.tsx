import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchInput } from "./index";

describe("SearchInput", () => {
  it("renders with placeholder", () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={jest.fn()} placeholder="Search..." />
    );
    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput
        value=""
        onChangeText={onChangeText}
        placeholder="Search"
      />
    );

    const input = getByPlaceholderText("Search");
    fireEvent.changeText(input, "test");
    expect(onChangeText).toHaveBeenCalledWith("test");
  });

  it("displays the value", () => {
    const { getByDisplayValue } = render(
      <SearchInput
        value="test value"
        onChangeText={jest.fn()}
        placeholder="Search"
      />
    );
    expect(getByDisplayValue("test value")).toBeTruthy();
  });
});
