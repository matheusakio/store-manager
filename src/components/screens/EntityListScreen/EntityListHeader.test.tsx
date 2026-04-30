import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { EntityListHeader } from "./EntityListHeader";

describe("EntityListHeader", () => {
  it("renders title and subtitle", () => {
    const { getByText } = render(
      <EntityListHeader
        title="Test Title"
        subtitle="Test Subtitle"
        searchValue=""
        onSearchChange={jest.fn()}
        searchPlaceholder="Search..."
        onNewPress={jest.fn()}
        newButtonLabel="New Item"
      />
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
  });

  it("renders with filter component", () => {
    const { getByText } = render(
      <EntityListHeader
        title="Title"
        subtitle="Subtitle"
        searchValue=""
        onSearchChange={jest.fn()}
        searchPlaceholder="Search..."
        onNewPress={jest.fn()}
        newButtonLabel="New"
        filterComponent={<span>Filter</span>}
      />
    );
    expect(getByText("New")).toBeTruthy();
  });

  it("calls onNewPress when button is pressed", () => {
    const onNewPress = jest.fn();
    const { getByText } = render(
      <EntityListHeader
        title="Title"
        subtitle="Subtitle"
        searchValue=""
        onSearchChange={jest.fn()}
        searchPlaceholder="Search..."
        onNewPress={onNewPress}
        newButtonLabel="Create"
      />
    );
    fireEvent.press(getByText("Create"));
    expect(onNewPress).toHaveBeenCalled();
  });
});
