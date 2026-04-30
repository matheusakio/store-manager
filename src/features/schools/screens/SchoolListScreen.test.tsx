import React from "react";
import { render } from "@testing-library/react-native";
import { SchoolListScreen } from "./SchoolListScreen";

jest.mock("@/features/schools/hooks/use-school-list", () => ({
  useSchoolList: () => ({
    schools: [
      { id: "1", name: "School 1", address: "Address 1", classesCount: 5, createdAt: "2024-01-01" },
      { id: "2", name: "School 2", address: "Address 2", classesCount: 3, createdAt: "2024-01-01" },
    ],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    schoolSearch: "",
    setSchoolSearch: jest.fn(),
    schoolListFilter: "all",
    setSchoolListFilter: jest.fn(),
    handleDeleteSchool: jest.fn(),
    handleNavigateToNewSchool: jest.fn(),
    handleNavigateToSchool: jest.fn(),
    handleNavigateToEditSchool: jest.fn(),
  }),
}));

describe("SchoolListScreen", () => {
  it("renders school list", () => {
    const { getByText } = render(<SchoolListScreen />);
    expect(getByText("Escolas")).toBeTruthy();
    expect(getByText("2 unidades visíveis")).toBeTruthy();
    expect(getByText("School 1")).toBeTruthy();
    expect(getByText("School 2")).toBeTruthy();
  });
});
