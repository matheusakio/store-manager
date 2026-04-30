import { renderHook } from "@testing-library/react-native";
import { useSchoolActions } from "./use-school-actions";

describe("useSchoolActions", () => {
  it("returns actions", () => {
    const { result } = renderHook(() => useSchoolActions());
    
    expect(typeof result.current.createSchool).toBe("function");
    expect(typeof result.current.updateSchool).toBe("function");
    expect(typeof result.current.deleteSchool).toBe("function");
  });
});
