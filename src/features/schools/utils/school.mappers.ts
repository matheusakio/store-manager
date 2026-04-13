import type { SchoolClass } from "@/features/classes/types/class.types";
import type {
  School,
  SchoolWithClassesCount,
} from "@/features/schools/types/school.types";

export function mapSchoolsWithClassesCount(
  schools: School[] = [],
  classes: SchoolClass[] = [],
): SchoolWithClassesCount[] {
  return schools.map((school: School) => ({
    ...school,
    classesCount: classes.filter(
      (item: SchoolClass) => item.schoolId === school.id,
    ).length,
  }));
}
