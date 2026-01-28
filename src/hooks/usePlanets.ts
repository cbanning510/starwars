import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchPlanets,
  fetchPlanet,
  searchPlanets,
  fetchFromUrl,
} from "../api/swapi";
import type { Planet, PaginatedResponse } from "../types/swapi";

export const PLANETS_QUERY_KEY = "planets";

export const usePlanets = (page: number = 1) => {
  return useQuery<PaginatedResponse<Planet>, Error>({
    queryKey: [PLANETS_QUERY_KEY, page],
    queryFn: () => fetchPlanets(page),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

export const usePlanetsInfinite = () => {
  return useInfiniteQuery<PaginatedResponse<Planet>, Error>({
    queryKey: [PLANETS_QUERY_KEY, "infinite"],
    queryFn: ({ pageParam = 1 }) => fetchPlanets(pageParam as number),
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

export const usePlanet = (id: string) => {
  return useQuery<Planet, Error>({
    queryKey: [PLANETS_QUERY_KEY, id],
    queryFn: () => fetchPlanet(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const usePlanetByUrl = (url: string) => {
  return useQuery<Planet, Error>({
    queryKey: [PLANETS_QUERY_KEY, "url", url],
    queryFn: () => fetchFromUrl<Planet>(url),
    enabled: !!url,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSearchPlanets = (query: string, enabled: boolean = true) => {
  return useQuery<PaginatedResponse<Planet>, Error>({
    queryKey: [PLANETS_QUERY_KEY, "search", query],
    queryFn: () => searchPlanets(query),
    enabled: enabled && query.length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
