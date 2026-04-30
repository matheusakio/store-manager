import { useClassesStore } from "./classes.store";
import type { ClassShift } from "../types/class.types";

const MATUTINO = "Matutino" as ClassShift;
const VESPERTINO = "Vespertino" as ClassShift;

describe("useClassesStore", () => {
  beforeEach(() => {
    useClassesStore.setState({
      classes: [],
      isLoading: false,
      error: null,
    });
  });

  it("should set classes", () => {
    const classes = [{ id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" }];
    useClassesStore.getState().setClasses(classes);
    expect(useClassesStore.getState().classes).toEqual(classes);
  });

  it("should add a class", () => {
    const cls = { id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    useClassesStore.getState().addClass(cls);
    expect(useClassesStore.getState().classes).toContainEqual(cls);
  });

  it("should update a class", () => {
    const cls = { id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    useClassesStore.getState().addClass(cls);
    
    const updatedClass = { id: "1", name: "Updated Class", shift: VESPERTINO, schoolYear: "2025", schoolId: "1", createdAt: "2024-01-01" };
    useClassesStore.getState().updateClass("1", updatedClass);
    
    expect(useClassesStore.getState().classes[0]).toEqual(updatedClass);
  });

  it("should remove a class", () => {
    const cls = { id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    useClassesStore.getState().addClass(cls);
    useClassesStore.getState().removeClass("1");
    expect(useClassesStore.getState().classes).toHaveLength(0);
  });

  it("should get class by id", () => {
    const cls = { id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    useClassesStore.getState().addClass(cls);
    const result = useClassesStore.getState().getClassById("1");
    expect(result).toEqual(cls);
  });

  it("should get classes by school", () => {
    const class1 = { id: "1", name: "Class 1", shift: MATUTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    const class2 = { id: "2", name: "Class 2", shift: VESPERTINO, schoolYear: "2024", schoolId: "1", createdAt: "2024-01-01" };
    const class3 = { id: "3", name: "Class 3", shift: MATUTINO, schoolYear: "2024", schoolId: "2", createdAt: "2024-01-01" };
    
    useClassesStore.getState().addClass(class1);
    useClassesStore.getState().addClass(class2);
    useClassesStore.getState().addClass(class3);
    
    const result = useClassesStore.getState().getClassesBySchool("1");
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(class1);
    expect(result).toContainEqual(class2);
  });
});
