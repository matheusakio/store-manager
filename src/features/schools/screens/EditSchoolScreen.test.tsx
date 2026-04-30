import React from "react";
import { render } from "@testing-library/react-native";
import { EditSchoolScreen } from "./EditSchoolScreen";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ schoolId: "1" }),
}));

jest.mock("@/features/schools/store/schools.store", () => ({
  useSchoolsStore: () => ({
    isLoading: false,
    error: null,
    getSchoolById: () => ({
      id: "1",
      name: "School 1",
      address: "Address 1",
      createdAt: "2024-01-01",
    }),
    fetchSchools: jest.fn(),
    updateSchoolAsync: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-entity-form", () => ({
  useEntityForm: () => ({
    isSubmitting: false,
    handleSubmit: jest.fn(),
  }),
}));

describe("EditSchoolScreen", () => {
  it("renders edit school form", () => {
    const { getByText } = render(<EditSchoolScreen />);
    expect(getByText("Editar escola")).toBeTruthy();
    expect(getByText("Atualize os dados da unidade")).toBeTruthy();
  });
});
