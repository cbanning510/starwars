import { useQuery, useInfiniteQuery, useQueries } from "@tanstack/react-query";
import {
  fetchStarships,
  fetchStarship,
  searchStarships,
  fetchFromUrl,
} from "../api/swapi";
import type { Starship, PaginatedResponse } from "../types/swapi";

export const STARSHIPS_QUERY_KEY = "starships";

export const useStarships = (page: number = 1) => {
  return useQuery<PaginatedResponse<Starship>, Error>({
    queryKey: [STARSHIPS_QUERY_KEY, page],
    queryFn: () => fetchStarships(page),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

export const useStarshipsInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Starship>, Error>({
    queryKey: [STARSHIPS_QUERY_KEY, "infinite"],
    queryFn: ({ pageParam = 1 }) => fetchStarships(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");
      return page ? parseInt(page, 10) : undefined;
    },
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

export const useStarship = (id: string) => {
  return useQuery<Starship, Error>({
    queryKey: [STARSHIPS_QUERY_KEY, id],
    queryFn: () => fetchStarship(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useStarshipsByUrls = (urls: string[]) => {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: [STARSHIPS_QUERY_KEY, "url", url],
      queryFn: () => fetchFromUrl<Starship>(url),
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  });
};

export const useSearchStarships = (query: string, enabled: boolean = true) => {
  return useQuery<PaginatedResponse<Starship>, Error>({
    queryKey: [STARSHIPS_QUERY_KEY, "search", query],
    queryFn: () => searchStarships(query),
    enabled: enabled && query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
