import React from "react";
import { render } from "@testing-library/react-native";
import { NewClassScreen } from "./NewClassScreen";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ schoolId: "1" }),
}));

jest.mock("@/features/classes/store/classes.store", () => ({
  useClassesStore: () => ({
    createClass: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-entity-form", () => ({
  useEntityForm: () => ({
    isSubmitting: false,
    handleSubmit: jest.fn(),
  }),
}));

describe("NewClassScreen", () => {
  it("renders new class form", () => {
    const { getByText } = render(<NewClassScreen />);
    expect(getByText("Nova turma")).toBeTruthy();
    expect(getByText("Cadastre uma turma para esta escola")).toBeTruthy();
  });
});
