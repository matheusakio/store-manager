import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SchoolForm } from "./index";

describe("SchoolForm", () => {
  it("renders form fields", () => {
    const { getByText } = render(
      <SchoolForm
        onSubmit={jest.fn()}
        isSubmitting={false}
        submitLabel="Submit"
      />
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("renders with default values", () => {
    const { getByDisplayValue } = render(
      <SchoolForm
        defaultValues={{ name: "Test School", address: "Test Address" }}
        onSubmit={jest.fn()}
        isSubmitting={false}
        submitLabel="Submit"
      />
    );
    expect(getByDisplayValue("Test School")).toBeTruthy();
    expect(getByDisplayValue("Test Address")).toBeTruthy();
  });
});
