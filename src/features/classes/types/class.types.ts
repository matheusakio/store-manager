import type { SchoolId } from "@/features/schools/types/school.types";

export const CLASS_SHIFTS = [
  "Matutino",
  "Vespertino",
  "Noturno",
  "Integral",
] as const;

export type ClassShift = (typeof CLASS_SHIFTS)[number];

export type SchoolClassId = string;

export type SchoolClass = {
  id: SchoolClassId;
  schoolId: SchoolId;
  name: string;
  shift: ClassShift;
  schoolYear: string;
  createdAt: string;
};

export type CreateClassInput = {
  schoolId: SchoolId;
  name: string;
  shift: ClassShift;
  schoolYear: string;
};

export type UpdateClassInput = {
  name: string;
  shift: ClassShift;
  schoolYear: string;
};
