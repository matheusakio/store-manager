import { schoolsRepository } from "./schools.repository";

describe("schoolsRepository", () => {
  it("lists all schools", async () => {
    const schools = await schoolsRepository.list();
    expect(Array.isArray(schools)).toBe(true);
    expect(schools.length).toBeGreaterThan(0);
  });

  it("creates a new school", async () => {
    const newSchool = await schoolsRepository.create({
      name: "Test School",
      address: "Test Address",
    });
    expect(newSchool).toHaveProperty("id");
    expect(newSchool.name).toBe("Test School");
  });

  it("updates an existing school", async () => {
    const schools = await schoolsRepository.list();
    const school = schools[0];

    const updated = await schoolsRepository.update(school!.id, {
      name: "Updated Name",
      address: "Updated Address",
    });

    expect(updated.name).toBe("Updated Name");
  });

  it("deletes a school", async () => {
    const newSchool = await schoolsRepository.create({
      name: "Delete Test",
      address: "Delete Address",
    });

    await schoolsRepository.remove(newSchool!.id);
    const schools = await schoolsRepository.list();

    expect(schools.find((s) => s.id === newSchool!.id)).toBeUndefined();
  });
});
