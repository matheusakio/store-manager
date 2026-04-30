import React from "react";
import { render } from "@testing-library/react-native";
import { ClassForm } from "./index";

describe("ClassForm", () => {
  it("renders form fields", () => {
    const { getByText } = render(
      <ClassForm
        onSubmit={jest.fn()}
        isSubmitting={false}
        submitLabel="Submit"
      />
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("renders with default values", () => {
    const { getByDisplayValue } = render(
      <ClassForm
        defaultValues={{ name: "Test Class", shift: "Matutino", schoolYear: "2024" }}
        onSubmit={jest.fn()}
        isSubmitting={false}
        submitLabel="Submit"
      />
    );
    expect(getByDisplayValue("Test Class")).toBeTruthy();
    expect(getByDisplayValue("2024")).toBeTruthy();
  });
});
