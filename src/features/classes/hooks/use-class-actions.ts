import { classesRepository } from "../services/classes.repository";
import type { CreateClassInput, UpdateClassInput } from "../types/class.types";

export function useClassActions() {
  async function createSchoolClass(input: CreateClassInput) {
    return classesRepository.create(input);
  }

  async function updateSchoolClass(id: string, input: UpdateClassInput) {
    return classesRepository.update(id, input);
  }

  async function deleteSchoolClass(id: string) {
    return classesRepository.remove(id);
  }

  return {
    createSchoolClass,
    updateSchoolClass,
    deleteSchoolClass,
  };
}
