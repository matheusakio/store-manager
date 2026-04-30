import { storage } from "./index";

describe("storage", () => {
  beforeEach(async () => {
    await storage.clear();
  });

  it("should save and retrieve schools", async () => {
    const schools = [{ id: "1", name: "School 1" }];
    await storage.setSchools(schools);
    const result = await storage.getSchools();
    expect(result).toEqual(schools);
  });

  it("should return null when no schools exist", async () => {
    const result = await storage.getSchools();
    expect(result).toBeNull();
  });

  it("should save and retrieve classes", async () => {
    const classes = [{ id: "1", name: "Class 1" }];
    await storage.setClasses("school-1", classes);
    const result = await storage.getClasses("school-1");
    expect(result).toEqual(classes);
  });
});
