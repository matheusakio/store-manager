import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SchoolCard } from "./index";
import type { SchoolWithClassesCount } from "../../types/school.types";

describe("SchoolCard", () => {
  const mockSchool: SchoolWithClassesCount = {
    id: "school-1",
    name: "Test School",
    address: "123 Test St",
    classesCount: 5,
    createdAt: "2024-01-01",
  };

  it("renders school name and address", () => {
    const { getByText } = render(
      <SchoolCard
        school={mockSchool}
        onPress={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(getByText("Test School")).toBeTruthy();
    expect(getByText("123 Test St")).toBeTruthy();
  });

  it("calls onPress when card is pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SchoolCard
        school={mockSchool}
        onPress={onPress}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    fireEvent.press(getByText("Test School"));
    expect(onPress).toHaveBeenCalled();
  });

  it("calls onEdit when edit button is pressed", () => {
    const onEdit = jest.fn();
    const { getByText } = render(
      <SchoolCard
        school={mockSchool}
        onPress={jest.fn()}
        onEdit={onEdit}
        onDelete={jest.fn()}
      />
    );

    fireEvent.press(getByText("Editar"));
    expect(onEdit).toHaveBeenCalled();
  });
});
