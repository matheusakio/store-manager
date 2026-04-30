import { classesRepository } from "./classes.repository";

describe("classesRepository", () => {
  const schoolId = "test-school-id";

  it("lists classes by school", async () => {
    const classes = await classesRepository.listBySchool(schoolId);
    expect(Array.isArray(classes)).toBe(true);
  });

  it("creates a new class", async () => {
    const newClass = await classesRepository.create({
      schoolId,
      name: "Test Class",
      shift: "Matutino",
      schoolYear: "2024",
    });

    expect(newClass).toHaveProperty("id");
    expect(newClass.name).toBe("Test Class");
    expect(newClass.schoolId).toBe(schoolId);
  });

  it("updates an existing class", async () => {
    const newClass = await classesRepository.create({
      schoolId,
      name: "Update Test",
      shift: "Vespertino",
      schoolYear: "2024",
    });

    const updated = await classesRepository.update(newClass.id, {
      name: "Updated Name",
      shift: "Noturno",
      schoolYear: "2025",
    });

    expect(updated.name).toBe("Updated Name");
    expect(updated.shift).toBe("Noturno");
  });

  it("deletes a class", async () => {
    const newClass = await classesRepository.create({
      schoolId,
      name: "Delete Test",
      shift: "Matutino",
      schoolYear: "2024",
    });

    await classesRepository.remove(newClass.id);
    const classes = await classesRepository.listBySchool(schoolId);

    expect(classes.find((c) => c.id === newClass.id)).toBeUndefined();
  });
});
