import { schoolsRepository } from "../services/schools.repository";
import { CreateSchoolInput, UpdateSchoolInput } from "../types/school.types";

export function useSchoolActions() {
  async function createSchool(input: CreateSchoolInput) {
    return schoolsRepository.create(input);
  }

  async function updateSchool(id: string, input: UpdateSchoolInput) {
    return schoolsRepository.update(id, input);
  }

  async function deleteSchool(id: string) {
    return schoolsRepository.remove(id);
  }

  return {
    createSchool,
    updateSchool,
    deleteSchool,
  };
}
