import { z } from "zod";
import { CLASS_SHIFTS } from "@/features/classes/types/class.types";

const requiredText = (message: string) => z.string().trim().min(1, message);

const classShiftInputSchema = z
  .union([z.enum(CLASS_SHIFTS), z.literal("")])
  .refine((value) => value !== "", {
    message: "Selecione um turno",
  });

export const schoolFormSchema = z.object({
  name: requiredText("Informe o nome"),
  address: requiredText("Informe o endereço"),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;

export const classFormSchema = z.object({
  name: requiredText("Informe o nome da turma"),
  shift: classShiftInputSchema,
  schoolYear: requiredText("Informe o ano letivo"),
});

export type ClassFormInput = {
  name: string;
  shift: "" | (typeof CLASS_SHIFTS)[number];
  schoolYear: string;
};

export type ClassFormValues = {
  name: string;
  shift: (typeof CLASS_SHIFTS)[number];
  schoolYear: string;
};
