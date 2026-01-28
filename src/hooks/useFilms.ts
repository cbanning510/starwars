import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchFilms, fetchFilm, fetchFromUrl } from "../api/swapi";
import type { Film, PaginatedResponse } from "../types/swapi";

export const FILMS_QUERY_KEY = "films";

export const useFilms = () => {
  return useQuery<PaginatedResponse<Film>, Error>({
    queryKey: [FILMS_QUERY_KEY],
    queryFn: fetchFilms,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useFilm = (id: string) => {
  return useQuery<Film, Error>({
    queryKey: [FILMS_QUERY_KEY, id],
    queryFn: () => fetchFilm(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useFilmsByUrls = (urls: string[]) => {
  return useQueries({
    queries: urls.map((url) => ({
      queryKey: [FILMS_QUERY_KEY, "url", url],
      queryFn: () => fetchFromUrl<Film>(url),
      staleTime: 30 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    })),
  });
};
