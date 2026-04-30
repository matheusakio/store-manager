import { renderHook } from "@testing-library/react-native";
import { useSchoolList } from "./use-school-list";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useFocusEffect: jest.fn((fn) => fn()),
  useLocalSearchParams: () => ({}),
}));

jest.mock("@/features/schools/store/schools.store", () => ({
  useSchoolsStore: () => ({
    schools: [],
    isLoading: false,
    error: null,
    fetchSchools: jest.fn(),
    deleteSchoolAsync: jest.fn(),
    getSchoolById: jest.fn(),
  }),
}));

jest.mock("@/features/classes/store/classes.store", () => ({
  useClassesStore: () => ({
    classes: [],
    isLoading: false,
    fetchAllClasses: jest.fn(),
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
