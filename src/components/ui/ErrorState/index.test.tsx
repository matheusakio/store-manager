import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ErrorState } from "./index";

describe("ErrorState", () => {
  it("renders error message", () => {
    const { getByText } = render(
      <ErrorState message="Something went wrong" onRetry={jest.fn()} />
    );
    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("calls onRetry when retry button is pressed", () => {
    const onRetry = jest.fn();
    const { getByText } = render(
      <ErrorState message="Error" onRetry={onRetry} />
    );

    fireEvent.press(getByText("Tentar novamente"));
    expect(onRetry).toHaveBeenCalled();
  });
});
