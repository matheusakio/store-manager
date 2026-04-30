import { useSchoolsStore } from "./schools.store";

describe("useSchoolsStore", () => {
  beforeEach(() => {
    useSchoolsStore.setState({
      schools: [],
      isLoading: false,
      error: null,
    });
  });

  it("should set schools", () => {
    const schools = [{ id: "1", name: "School 1", address: "Address 1", createdAt: "2024-01-01" }];
    useSchoolsStore.getState().setSchools(schools);
    expect(useSchoolsStore.getState().schools).toEqual(schools);
  });

  it("should add a school", () => {
    const school = { id: "1", name: "School 1", address: "Address 1", createdAt: "2024-01-01" };
    useSchoolsStore.getState().addSchool(school);
    expect(useSchoolsStore.getState().schools).toContainEqual(school);
  });

  it("should update a school", () => {
    const school = { id: "1", name: "School 1", address: "Address 1", createdAt: "2024-01-01" };
    useSchoolsStore.getState().addSchool(school);
    
    const updatedSchool = { id: "1", name: "Updated School", address: "New Address", createdAt: "2024-01-01" };
    useSchoolsStore.getState().updateSchool("1", updatedSchool);
    
    expect(useSchoolsStore.getState().schools[0]).toEqual(updatedSchool);
  });

  it("should remove a school", () => {
    const school = { id: "1", name: "School 1", address: "Address 1", createdAt: "2024-01-01" };
    useSchoolsStore.getState().addSchool(school);
    useSchoolsStore.getState().removeSchool("1");
    expect(useSchoolsStore.getState().schools).toHaveLength(0);
  });

  it("should get school by id", () => {
    const school = { id: "1", name: "School 1", address: "Address 1", createdAt: "2024-01-01" };
    useSchoolsStore.getState().addSchool(school);
    const result = useSchoolsStore.getState().getSchoolById("1");
    expect(result).toEqual(school);
  });

  it("should return null for non-existent school", () => {
    const result = useSchoolsStore.getState().getSchoolById("999");
    expect(result).toBeNull();
  });
});
