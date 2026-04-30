import React from "react";
import { render } from "@testing-library/react-native";
import { EntityFormScreen } from "./index";
import { Text } from "react-native";

describe("EntityFormScreen", () => {
  it("renders children when not loading and no error", () => {
    const { getByText } = render(
      <EntityFormScreen title="Test Title" subtitle="Test Subtitle">
        <Text>Form Content</Text>
      </EntityFormScreen>
    );
    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Subtitle")).toBeTruthy();
    expect(getByText("Form Content")).toBeTruthy();
  });

  it("shows loading state when isLoading is true", () => {
    const { getByText } = render(
      <EntityFormScreen title="Test" subtitle="Test" isLoading>
        <Text>Content</Text>
      </EntityFormScreen>
    );
    expect(getByText("Carregando...")).toBeTruthy();
  });

  it("shows error state when error is provided", () => {
    const { getByText } = render(
      <EntityFormScreen title="Test" subtitle="Test" error="Error message">
        <Text>Content</Text>
      </EntityFormScreen>
    );
    expect(getByText("Ocorreu um erro")).toBeTruthy();
    expect(getByText("Error message")).toBeTruthy();
  });
});
