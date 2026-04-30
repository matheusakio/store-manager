import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ShiftSelector } from "./index";

describe("ShiftSelector", () => {
  it("renders shift options without all option", () => {
    const { getByText } = render(
      <ShiftSelector value="Matutino" onChange={jest.fn()} />
    );
    expect(getByText("Matutino")).toBeTruthy();
    expect(getByText("Vespertino")).toBeTruthy();
    expect(getByText("Noturno")).toBeTruthy();
    expect(getByText("Integral")).toBeTruthy();
  });

  it("renders 'Todos' option when includeAllOption is true", () => {
    const { getByText } = render(
      <ShiftSelector
        value="Todos"
        onChange={jest.fn()}
        includeAllOption
      />
    );
    expect(getByText("Todos")).toBeTruthy();
  });

  it("calls onChange when shift is selected", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <ShiftSelector value="Matutino" onChange={onChange} />
    );

    fireEvent.press(getByText("Vespertino"));
    expect(onChange).toHaveBeenCalledWith("Vespertino");
  });

  it("displays error when provided", () => {
    const { getByText } = render(
      <ShiftSelector
        value="Matutino"
        onChange={jest.fn()}
        error="Selecione um turno"
      />
    );
    expect(getByText("Selecione um turno")).toBeTruthy();
  });
});
