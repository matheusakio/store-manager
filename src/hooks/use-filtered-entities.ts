import { useMemo } from "react";

export type FilterFn<T> = (item: T) => boolean;
export type GetSearchableFields<T> = (item: T) => string[];

interface UseFilteredEntitiesOptions<T> {
  items: T[];
  searchQuery: string;
  getSearchableFields: GetSearchableFields<T>;
  filterFn?: FilterFn<T>;
}

export function useFilteredEntities<T>({
  items,
  searchQuery,
  getSearchableFields,
  filterFn,
}: UseFilteredEntitiesOptions<T>): T[] {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        getSearchableFields(item).some((field) =>
          field.toLowerCase().includes(query),
        );

      const matchesFilter = filterFn ? filterFn(item) : true;

      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, getSearchableFields, filterFn]);
}
