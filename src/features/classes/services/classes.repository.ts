import { api } from "@/services/api/client";
import type {
  SchoolClass,
  CreateClassInput,
  UpdateClassInput,
} from "../types/class.types";

export const classesRepository = {
  listAll: async (): Promise<SchoolClass[]> => {
    const response = await api.get<{ classes: SchoolClass[] }>("/classes");
    return response.classes;
  },

  listBySchool: async (schoolId: string): Promise<SchoolClass[]> => {
    const response = await api.get<{ classes: SchoolClass[] }>(
      `/classes?schoolId=${schoolId}`,
    );

    return response.classes;
  },

  create: async (input: CreateClassInput): Promise<SchoolClass> => {
    return api.post("/classes", input);
  },

  update: async (id: string, input: UpdateClassInput): Promise<SchoolClass> => {
    return api.put(`/classes/${id}`, input);
  },

  remove: async (id: string) => {
    return api.delete(`/classes/${id}`);
  },
};
