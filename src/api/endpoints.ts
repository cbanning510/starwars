export const ENDPOINTS = {
  PEOPLE: "/people",
  FILMS: "/films",
  PLANETS: "/planets",
  STARSHIPS: "/starships",
  VEHICLES: "/vehicles",
  SPECIES: "/species",
} as const;

export const getResourceId = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : "";
};

export const buildResourceUrl = (endpoint: string, id: string): string => {
  return `${endpoint}/${id}/`;
};

export const buildSearchUrl = (endpoint: string, query: string): string => {
  return `${endpoint}/?search=${encodeURIComponent(query)}`;
};

export const buildPageUrl = (endpoint: string, page: number): string => {
  return `${endpoint}/?page=${page}`;
};
