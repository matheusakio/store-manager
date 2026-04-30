import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ClassCard } from "./index";
import type { SchoolClass } from "../../types/class.types";

describe("ClassCard", () => {
  const mockClass: SchoolClass = {
    id: "class-1",
    name: "Turma A",
    shift: "Matutino",
    schoolYear: "2024",
    schoolId: "school-1",
    createdAt: "2024-01-01",
  };

  it("renders class name and details", () => {
    const { getByText } = render(
      <ClassCard
        schoolClass={mockClass}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );
    expect(getByText("Turma A")).toBeTruthy();
    expect(getByText("Matutino")).toBeTruthy();
    expect(getByText("2024")).toBeTruthy();
  });

  it("calls onEdit when edit button is pressed", () => {
    const onEdit = jest.fn();
    const { getByText } = render(
      <ClassCard
        schoolClass={mockClass}
        onEdit={onEdit}
        onDelete={jest.fn()}
      />,
    );

    fireEvent.press(getByText("Editar"));
    expect(onEdit).toHaveBeenCalled();
  });

  it("calls onDelete when delete button is pressed", () => {
    const onDelete = jest.fn();
    const { getByText } = render(
      <ClassCard
        schoolClass={mockClass}
        onEdit={jest.fn()}
        onDelete={onDelete}
      />,
    );

    fireEvent.press(getByText("Excluir"));
    expect(onDelete).toHaveBeenCalled();
  });
});
