import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { TextField } from "@/components/forms/TextField";
import {
  classFormSchema,
  type ClassFormInput,
  type ClassFormValues,
} from "@/lib/validations";

import { styles } from "./styles";
import { ShiftSelector } from "../ShiftSelector";

type ClassFormProps = {
  defaultValues?: ClassFormInput;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: ClassFormValues) => Promise<void> | void;
};

export function ClassForm({
  defaultValues,
  isSubmitting = false,
  submitLabel = "Salvar",
  onSubmit,
}: ClassFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassFormInput, unknown, ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      shift: "",
      schoolYear: "",
    },
  });

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Nome da turma"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: 5º Ano A"
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="shift"
        render={({ field: { value, onChange } }) => (
          <ShiftSelector
            value={value}
            onChange={onChange}
            label="Turno"
            error={errors.shift?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="schoolYear"
        render={({ field: { value, onChange } }) => (
          <TextField
            label="Ano letivo"
            value={value}
            onChangeText={onChange}
            placeholder="Ex: 2026"
            error={errors.schoolYear?.message}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText>{isSubmitting ? "Salvando..." : submitLabel}</ButtonText>
      </Button>
    </View>
  );
}
