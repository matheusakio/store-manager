import { useMemo } from "react";

export function useFilteredList<T>(
  items: T[],
  searchQuery: string,
  getSearchableText: (item: T) => string[],
  filterFn?: ((item: T) => boolean) | null,
) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        getSearchableText(item).some((text) =>
          text.toLowerCase().includes(query),
        );

      const matchesFilter = filterFn ? filterFn(item) : true;

      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, getSearchableText, filterFn]);
}
