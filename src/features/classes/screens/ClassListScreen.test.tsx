import React from "react";
import { render } from "@testing-library/react-native";
import { ClassListScreen } from "./ClassListScreen";

jest.mock("@/features/classes/hooks/use-class-list", () => ({
  useClassList: () => ({
    classes: [
      { id: "1", name: "Class 1", shift: "Matutino", schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" },
      { id: "2", name: "Class 2", shift: "Vespertino", schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" },
    ],
    school: { id: "1", name: "School 1", address: "Address 1" },
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    classSearch: "",
    setClassSearch: jest.fn(),
    selectedShift: "Todos",
    setSelectedShift: jest.fn(),
    handleDeleteClass: jest.fn(),
    handleNavigateToNewClass: jest.fn(),
    handleNavigateToEditClass: jest.fn(),
  }),
}));

describe("ClassListScreen", () => {
  it("renders class list", () => {
    const { getByText } = render(<ClassListScreen />);
    expect(getByText("School 1")).toBeTruthy();
    expect(getByText("Address 1")).toBeTruthy();
    expect(getByText("Class 1")).toBeTruthy();
    expect(getByText("Class 2")).toBeTruthy();
  });
});
