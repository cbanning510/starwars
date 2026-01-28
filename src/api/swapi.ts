import apiClient from "./client";
import { ENDPOINTS, getResourceId } from "./endpoints";
import type {
  PaginatedResponse,
  Person,
  Film,
  Planet,
  Starship,
  Vehicle,
  Species,
} from "../types/swapi";

export const fetchResource = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<T>(url);
  return response.data;
};

export const fetchPeople = async (
  page: number = 1,
): Promise<PaginatedResponse<Person>> => {
  const response = await apiClient.get<PaginatedResponse<Person>>(
    `${ENDPOINTS.PEOPLE}/?page=${page}`,
  );
  return response.data;
};

export const fetchPerson = async (id: string): Promise<Person> => {
  const response = await apiClient.get<Person>(`${ENDPOINTS.PEOPLE}/${id}/`);
  return response.data;
};

export const searchPeople = async (
  query: string,
): Promise<PaginatedResponse<Person>> => {
  const response = await apiClient.get<PaginatedResponse<Person>>(
    `${ENDPOINTS.PEOPLE}/?search=${encodeURIComponent(query)}`,
  );
  return response.data;
};

export const fetchFilms = async (): Promise<PaginatedResponse<Film>> => {
  const response = await apiClient.get<PaginatedResponse<Film>>(
    ENDPOINTS.FILMS,
  );
  return response.data;
};

export const fetchFilm = async (id: string): Promise<Film> => {
  const response = await apiClient.get<Film>(`${ENDPOINTS.FILMS}/${id}/`);
  return response.data;
};

export const fetchPlanets = async (
  page: number = 1,
): Promise<PaginatedResponse<Planet>> => {
  const response = await apiClient.get<PaginatedResponse<Planet>>(
    `${ENDPOINTS.PLANETS}/?page=${page}`,
  );
  return response.data;
};

export const fetchPlanet = async (id: string): Promise<Planet> => {
  const response = await apiClient.get<Planet>(`${ENDPOINTS.PLANETS}/${id}/`);
  return response.data;
};

export const searchPlanets = async (
  query: string,
): Promise<PaginatedResponse<Planet>> => {
  const response = await apiClient.get<PaginatedResponse<Planet>>(
    `${ENDPOINTS.PLANETS}/?search=${encodeURIComponent(query)}`,
  );
  return response.data;
};

export const fetchStarships = async (
  page: number = 1,
): Promise<PaginatedResponse<Starship>> => {
  const response = await apiClient.get<PaginatedResponse<Starship>>(
    `${ENDPOINTS.STARSHIPS}/?page=${page}`,
  );
  return response.data;
};

export const fetchStarship = async (id: string): Promise<Starship> => {
  const response = await apiClient.get<Starship>(
    `${ENDPOINTS.STARSHIPS}/${id}/`,
  );
  return response.data;
};

export const searchStarships = async (
  query: string,
): Promise<PaginatedResponse<Starship>> => {
  const response = await apiClient.get<PaginatedResponse<Starship>>(
    `${ENDPOINTS.STARSHIPS}/?search=${encodeURIComponent(query)}`,
  );
  return response.data;
};

export const fetchVehicles = async (
  page: number = 1,
): Promise<PaginatedResponse<Vehicle>> => {
  const response = await apiClient.get<PaginatedResponse<Vehicle>>(
    `${ENDPOINTS.VEHICLES}/?page=${page}`,
  );
  return response.data;
};

export const fetchVehicle = async (id: string): Promise<Vehicle> => {
  const response = await apiClient.get<Vehicle>(`${ENDPOINTS.VEHICLES}/${id}/`);
  return response.data;
};

export const fetchSpecies = async (
  page: number = 1,
): Promise<PaginatedResponse<Species>> => {
  const response = await apiClient.get<PaginatedResponse<Species>>(
    `${ENDPOINTS.SPECIES}/?page=${page}`,
  );
  return response.data;
};

export const fetchSpeciesById = async (id: string): Promise<Species> => {
  const response = await apiClient.get<Species>(`${ENDPOINTS.SPECIES}/${id}/`);
  return response.data;
};

export const fetchFromUrl = async <T>(url: string): Promise<T> => {
  const urlObj = new URL(url);
  const path = urlObj.pathname.replace("/api", "");
  const response = await apiClient.get<T>(path);
  return response.data;
};

export const fetchMultipleResources = async <T>(
  urls: string[],
): Promise<T[]> => {
  const promises = urls.map((url) => fetchFromUrl<T>(url));
  return Promise.all(promises);
};
