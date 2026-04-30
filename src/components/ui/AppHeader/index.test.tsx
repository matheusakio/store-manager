import React from "react";
import { render } from "@testing-library/react-native";
import { AppHeader } from "./index";

jest.mock("@/theme", () => ({
  theme: {
    colors: { text: "#000", textSecondary: "#666" },
    fonts: { size: { hero: 30, lg: 15 }, weight: { black: "900" } },
    spacing: { md: 16, xs: 4 },
    radius: { pill: 999 },
    shadow: { card: {} },
  },
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

describe("AppHeader", () => {
  it("renders title correctly", () => {
    const { getByText } = render(<AppHeader title="Test Title" />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("renders subtitle when provided", () => {
    const { getByText } = render(
      <AppHeader title="Title" subtitle="Subtitle" />
    );
    expect(getByText("Subtitle")).toBeTruthy();
  });

  it("renders back button when showBackButton is true", () => {
    const { getByTestId } = render(
      <AppHeader title="Title" showBackButton />
    );
    // Assuming the button has a testID
    expect(getByTestId("back-button")).toBeTruthy();
  });
});
