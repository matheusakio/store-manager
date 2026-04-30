import { renderHook } from "@testing-library/react-native";
import { useClassList } from "./use-class-list";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocalSearchParams: () => ({ schoolId: "school-1" }),
  useFocusEffect: jest.fn((fn) => fn()),
}));

jest.mock("@/features/classes/store/classes.store", () => ({
  useClassesStore: () => ({
    classes: [],
    isLoading: false,
    error: null,
    fetchClasses: jest.fn(),
    deleteClassAsync: jest.fn(),
  }),
}));

jest.mock("@/features/schools/store/schools.store", () => ({
  useSchoolsStore: () => ({
    getSchoolById: jest.fn(),
    isLoading: false,
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
