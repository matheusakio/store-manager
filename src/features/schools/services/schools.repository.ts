import { api } from "@/services/api/client";
import type {
  CreateSchoolInput,
  School,
  UpdateSchoolInput,
} from "../types/school.types";

export const schoolsRepository = {
  list: async (): Promise<School[]> => {
    const response = await api.get<{ schools: School[] }>("/schools");
    return response.schools;
  },

  create: async (input: CreateSchoolInput): Promise<School> => {
    return api.post("/schools", input);
  },

  update: async (id: string, input: UpdateSchoolInput): Promise<School> => {
    return api.put(`/schools/${id}`, input);
  },

  remove: async (id: string) => {
    return api.delete(`/schools/${id}`);
  },
};
