import type { SchoolClass } from "@/features/classes/types/class.types";
import type {
  School,
  SchoolWithProductsCount,
} from "@/features/schools/types/school.types";

export function mapSchoolsWithProductsCount(
  schools: School[] = [],
  classes: SchoolClass[] = [],
): SchoolWithProductsCount[] {
  return schools.map((school) => ({
    ...school,
    productsCount: classes.filter((item) => item.schoolId === school.id).length,
  }));
}
