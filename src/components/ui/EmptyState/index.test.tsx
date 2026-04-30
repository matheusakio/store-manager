import React from "react";
import { render } from "@testing-library/react-native";
import { EmptyState } from "./index";

describe("EmptyState", () => {
  it("renders title and description", () => {
    const { getByText } = render(
      <EmptyState title="No Data" description="There is nothing here" />
    );

    expect(getByText("No Data")).toBeTruthy();
    expect(getByText("There is nothing here")).toBeTruthy();
  });

  it("renders without crashing", () => {
    const { root } = render(
      <EmptyState title="Title" description="Description" />
    );
    expect(root).toBeTruthy();
  });
});
