import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NewSchoolScreen } from "./NewSchoolScreen";

jest.mock("@/features/schools/hooks/use-school-actions", () => ({
  useSchoolActions: () => ({
    createSchool: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-entity-form", () => ({
  useEntityForm: () => ({
    isSubmitting: false,
    handleSubmit: jest.fn(),
  }),
}));

describe("NewSchoolScreen", () => {
  it("renders new school form", () => {
    const { getByText } = render(<NewSchoolScreen />);
    expect(getByText("Nova escola")).toBeTruthy();
    expect(getByText("Cadastre uma nova unidade")).toBeTruthy();
  });
});
