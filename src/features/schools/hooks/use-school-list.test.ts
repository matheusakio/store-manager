import { renderHook } from "@testing-library/react-native";
import { useSchoolList } from "./use-school-list";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useFocusEffect: jest.fn((fn) => fn()),
}));

jest.mock("./use-schools", () => ({
  useSchools: () => ({
    schools: [],
    isLoading: false,
    error: null,
    refetch: jest.fn(),
    getSchoolById: jest.fn(),
  }),
}));

jest.mock("@/features/classes/hooks/use-all-classes", () => ({
  useAllClasses: () => ({
    classes: [],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

jest.mock("./use-school-actions", () => ({
  useSchoolActions: () => ({
    deleteSchool: jest.fn(),
  }),
}));

describe("useSchoolList", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useSchoolList());

    expect(result.current.schools).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.handleDeleteSchool).toBe("function");
    expect(typeof result.current.handleNavigateToNewSchool).toBe("function");
  });
});
