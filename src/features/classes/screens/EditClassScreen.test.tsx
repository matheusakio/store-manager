import React from "react";
import { render } from "@testing-library/react-native";
import { EditClassScreen } from "./EditClassScreen";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ schoolId: "1", classId: "1" }),
}));

jest.mock("@/features/classes/store/classes.store", () => ({
  useClassesStore: () => ({
    isLoading: false,
    error: null,
    getClassById: () => ({
      id: "1",
      name: "Class 1",
      shift: "Matutino",
      schoolYear: "2024",
      schoolId: "1",
      createdAt: "2024-01-01",
    }),
    fetchClasses: jest.fn(),
    updateClassAsync: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-entity-form", () => ({
  useEntityForm: () => ({
    isSubmitting: false,
    handleSubmit: jest.fn(),
  }),
}));

describe("EditClassScreen", () => {
  it("renders edit class form", () => {
    const { getByText } = render(<EditClassScreen />);
    expect(getByText("Editar turma")).toBeTruthy();
    expect(getByText("Atualize os dados da turma")).toBeTruthy();
  });
});
