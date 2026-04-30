import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useEntityForm } from "./use-entity-form";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));


jest.mock("@/components/feedback/app-alert", () => ({
  showSuccess: jest.fn(),
  showError: jest.fn(),
}));

describe("useEntityForm", () => {
  it("should handle successful submission", async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useEntityForm({
        onSubmit,
        successMessage: "Success!",
        errorMessage: "Error!",
      }),
    );

    expect(result.current.isSubmitting).toBe(false);

    await act(async () => {
      await result.current.handleSubmit({ name: "Test" });
    });

    expect(onSubmit).toHaveBeenCalledWith({ name: "Test" });
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should handle submission error", async () => {
    const onSubmit = jest.fn().mockRejectedValue(new Error("Failed"));

    const { result } = renderHook(() =>
      useEntityForm({
        onSubmit,
        successMessage: "Success!",
        errorMessage: "Error!",
      }),
    );

    await act(async () => {
      await result.current.handleSubmit({ name: "Test" });
    });

    expect(onSubmit).toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("should set isSubmitting to true during submission", async () => {
    let resolveSubmit: ((value?: unknown) => void) | null = null;
    const onSubmit = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    const { result } = renderHook(() =>
      useEntityForm({
        onSubmit,
        successMessage: "Success!",
        errorMessage: "Error!",
      }),
    );

    act(() => {
      result.current.handleSubmit({ name: "Test" });
    });

    expect(result.current.isSubmitting).toBe(true);

    act(() => {
      resolveSubmit?.();
    });

    await waitFor(() => {
      expect(result.current.isSubmitting).toBe(false);
    });
  });
});
