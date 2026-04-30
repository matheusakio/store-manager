import { renderHook } from "@testing-library/react-native";
import { useClassActions } from "./use-class-actions";

describe("useClassActions", () => {
  it("returns actions", () => {
    const { result } = renderHook(() => useClassActions());
    
    expect(typeof result.current.createSchoolClass).toBe("function");
    expect(typeof result.current.updateSchoolClass).toBe("function");
    expect(typeof result.current.deleteSchoolClass).toBe("function");
  });
});
