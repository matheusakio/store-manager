import { ChipFilter } from "@/components/ui/ChipFilter";
import type { SchoolListFilter as SchoolListFilterValue } from "../../store/schools-ui.store";

type SchoolListFilterProps = {
  value: SchoolListFilterValue;
  onChange: (value: SchoolListFilterValue) => void;
};

const options: Array<{ label: string; value: SchoolListFilterValue }> = [
  { label: "Todas", value: "all" },
  { label: "Com turmas", value: "with-classes" },
  { label: "Sem turmas", value: "empty" },
];

export function SchoolListFilter({ value, onChange }: SchoolListFilterProps) {
  return <ChipFilter options={options} value={value} onChange={onChange} />;
}
