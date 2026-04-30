import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SchoolClass, UpdateClassInput } from "../types/class.types";
import { classesRepository } from "../services/classes.repository";
import { storage } from "@/lib/storage";

type ClassesState = {
  classes: SchoolClass[];
  isLoading: boolean;
  error: string | null;

  setClasses: (classes: SchoolClass[]) => void;
  addClass: (cls: SchoolClass) => void;
  updateClass: (id: string, cls: SchoolClass) => void;
  removeClass: (id: string) => void;

  fetchClasses: (schoolId: string) => Promise<void>;
  fetchAllClasses: () => Promise<void>;
  createClass: (input: Omit<SchoolClass, "id" | "createdAt">) => Promise<SchoolClass>;
  updateClassAsync: (id: string, input: UpdateClassInput) => Promise<SchoolClass>;
  deleteClassAsync: (id: string) => Promise<void>;

  getClassesBySchool: (schoolId: string) => SchoolClass[];
  getClassById: (id: string) => SchoolClass | null;
};

export const useClassesStore = create<ClassesState>()(
  persist(
    (set, get) => ({
      classes: [],
      isLoading: false,
      error: null,

      setClasses: (classes) => set({ classes }),

      addClass: (cls) =>
        set((state) => ({ classes: [...state.classes, cls] })),

      updateClass: (id, cls) =>
        set((state) => ({
          classes: state.classes.map((c) => (c.id === id ? cls : c)),
        })),

      removeClass: (id) =>
        set((state) => ({
          classes: state.classes.filter((c) => c.id !== id),
        })),

      fetchClasses: async (schoolId) => {
        set({ isLoading: true, error: null });
        try {
          const data = await classesRepository.listBySchool(schoolId);
        
          const otherClasses = get().classes.filter((c) => c.schoolId !== schoolId);
          set({ classes: [...otherClasses, ...data], isLoading: false });
        } catch {
          set({ error: "Erro ao carregar turmas", isLoading: false });
        }
      },

      fetchAllClasses: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await classesRepository.listAll();
          set({ classes: data, isLoading: false });
        } catch {
          set({ error: "Erro ao carregar turmas", isLoading: false });
        }
      },

      createClass: async (input) => {
        const cls = await classesRepository.create(input);
        get().addClass(cls);
        return cls;
      },

      updateClassAsync: async (id, input) => {
        const cls = await classesRepository.update(id, input);
        get().updateClass(id, cls);
        return cls;
      },

      deleteClassAsync: async (id) => {
        await classesRepository.remove(id);
        get().removeClass(id);
      },

      getClassesBySchool: (schoolId) => {
        return get().classes.filter((c) => c.schoolId === schoolId);
      },

      getClassById: (id) => {
        return get().classes.find((c) => c.id === id) ?? null;
      },
    }),
    {
      name: "classes-storage",
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ classes: state.classes }),
    }
  )
);
