import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SchoolListFilter } from "./index";

describe("SchoolListFilter", () => {
  it("renders filter options", () => {
    const { getByText } = render(
      <SchoolListFilter value="all" onChange={jest.fn()} />
    );
    expect(getByText("Todas")).toBeTruthy();
    expect(getByText("Com turmas")).toBeTruthy();
    expect(getByText("Sem turmas")).toBeTruthy();
  });

  it("calls onChange when filter is selected", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <SchoolListFilter value="all" onChange={onChange} />
    );

    fireEvent.press(getByText("Com turmas"));
    expect(onChange).toHaveBeenCalledWith("with-classes");
  });

  it("highlights selected filter", () => {
    const { getByText } = render(
      <SchoolListFilter value="empty" onChange={jest.fn()} />
    );

    const emptyFilter = getByText("Sem turmas");
    expect(emptyFilter).toBeTruthy();
  });
});
