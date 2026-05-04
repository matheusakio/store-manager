import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { School, UpdateSchoolInput } from "../types/school.types";
import { schoolsRepository } from "../services/schools.repository";
import { storage } from "@/lib/storage";

type SchoolsState = {
  schools: School[];
  isLoading: boolean;
  error: string | null;

  setSchools: (schools: School[]) => void;
  addSchool: (school: School) => void;
  updateSchool: (id: string, school: School) => void;
  removeSchool: (id: string) => void;

  fetchSchools: () => Promise<void>;
  createSchool: (input: Omit<School, "id" | "createdAt">) => Promise<School>;
  updateSchoolAsync: (id: string, input: UpdateSchoolInput) => Promise<School>;
  deleteSchoolAsync: (id: string) => Promise<void>;

  getSchoolById: (id: string) => School | null;
};

export const useSchoolsStore = create<SchoolsState>()(
  persist(
    (set, get) => ({
      schools: [],
      isLoading: false,
      error: null,

      setSchools: (schools) => set({ schools }),

      addSchool: (school) =>
        set((state) => ({ schools: [...state.schools, school] })),

      updateSchool: (id, school) =>
        set((state) => ({
          schools: state.schools.map((s) => (s.id === id ? school : s)),
        })),

      removeSchool: (id) =>
        set((state) => ({
          schools: state.schools.filter((s) => s.id !== id),
        })),

      fetchSchools: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await schoolsRepository.list();
          const existingSchools = get().schools;
          const mergedSchools = [...existingSchools];
          
          data.forEach((apiSchool) => {
            if (!existingSchools.find(s => s.id === apiSchool.id)) {
              mergedSchools.push(apiSchool);
            }
          });
          
          set({ schools: mergedSchools, isLoading: false });
        } catch {
          set({ error: "Erro ao carregar escolas", isLoading: false });
        }
      },

      createSchool: async (input) => {
        const school = await schoolsRepository.create(input);
        get().addSchool(school);
        return school;
      },

      updateSchoolAsync: async (id, input) => {
        const school = await schoolsRepository.update(id, input);
        get().updateSchool(id, school);
        return school;
      },

      deleteSchoolAsync: async (id) => {
        await schoolsRepository.remove(id);
        get().removeSchool(id);
      },

      getSchoolById: (id) => {
        return get().schools.find((s) => s.id === id) ?? null;
      },
    }),
    {
      name: "schools-storage",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ schools: state.schools }),
    }
  )
);
