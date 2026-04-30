import { renderHook } from "@testing-library/react-native";
import { useClassList } from "./use-class-list";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocalSearchParams: () => ({ schoolId: "school-1" }),
}));

jest.mock("./use-classes", () => ({
  useClasses: () => ({
    classes: [],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock("@/features/schools/hooks/use-schools", () => ({
  useSchools: () => ({
    getSchoolById: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock("./use-class-actions", () => ({
  useClassActions: () => ({
    deleteSchoolClass: jest.fn(),
  }),
}));

describe("useClassList", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useClassList());

    expect(result.current.classes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.handleDeleteClass).toBe("function");
    expect(typeof result.current.handleNavigateToNewClass).toBe("function");
  });
});
