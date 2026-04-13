import { theme } from "@/theme";
import type { SchoolClassCategory } from "../types/class.types";

export function getCategoryAccent(category: SchoolClassCategory) {
  switch (category) {
    case "Eletrônicos":
      return theme.category.electronics;

    case "Roupas":
      return theme.category.clothes;

    case "Alimentos":
      return theme.category.food;

    case "Casa":
      return theme.category.home;

    case "Beleza":
      return theme.category.beauty;

    default:
      return theme.category.other;
  }
}
