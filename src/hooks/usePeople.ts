import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPeople, fetchPerson, searchPeople } from "../api/swapi";
import type { Person, PaginatedResponse } from "../types/swapi";

export const PEOPLE_QUERY_KEY = "people";

export const usePeople = (page: number = 1) => {
  return useQuery<PaginatedResponse<Person>, Error>({
    queryKey: [PEOPLE_QUERY_KEY, page],
    queryFn: () => fetchPeople(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePeopleInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Person>, Error>({
    queryKey: [PEOPLE_QUERY_KEY, "infinite"],
    queryFn: ({ pageParam = 1 }) => fetchPeople(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const usePerson = (id: string) => {
  return useQuery<Person, Error>({
    queryKey: [PEOPLE_QUERY_KEY, id],
    queryFn: () => fetchPerson(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSearchPeople = (query: string, enabled: boolean = true) => {
  return useQuery<PaginatedResponse<Person>, Error>({
    queryKey: [PEOPLE_QUERY_KEY, "search", query],
    queryFn: () => searchPeople(query),
    enabled: enabled && query.length >= 2,
    staleTime: 3 * 60 * 1000,
  });
};
