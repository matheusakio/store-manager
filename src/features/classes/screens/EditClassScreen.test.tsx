import React from "react";
import { render } from "@testing-library/react-native";
import { EditClassScreen } from "./EditClassScreen";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ schoolId: "1", classId: "1" }),
}));

jest.mock("@/features/classes/hooks/use-classes", () => ({
  useClasses: () => ({
    classes: [
      { id: "1", name: "Class 1", shift: "Matutino", schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" },
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock("@/features/classes/hooks/use-class-actions", () => ({
  useClassActions: () => ({
    updateSchoolClass: jest.fn(),
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
