// src/utils/helpers.ts

import { getResourceId } from "../api/endpoints";

/**
 * Extract ID from SWAPI resource URL
 */
export const extractIdFromUrl = (url: string): string => {
  return getResourceId(url);
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (value: string | number): string => {
  if (value === "unknown" || value === "n/a") return value;
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString();
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Format height from cm to feet/inches
 */
export const formatHeight = (cm: string): string => {
  if (cm === "unknown" || cm === "n/a") return cm;
  const numCm = parseFloat(cm);
  if (isNaN(numCm)) return cm;

  const totalInches = numCm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${cm}cm (${feet}'${inches}")`;
};

/**
 * Format mass from kg to lbs
 */
export const formatMass = (kg: string): string => {
  if (kg === "unknown" || kg === "n/a") return kg;
  const numKg = parseFloat(kg.replace(/,/g, ""));
  if (isNaN(numKg)) return kg;

  const lbs = Math.round(numKg * 2.20462);
  return `${formatNumber(kg)}kg (${formatNumber(lbs)}lbs)`;
};

/**
 * Format gender for display
 */
export const formatGender = (gender: string): string => {
  if (gender === "n/a") return "N/A";
  return capitalizeWords(gender);
};

/**
 * Get color emoji for eye color
 */
export const getEyeColorEmoji = (color: string): string => {
  const colorMap: Record<string, string> = {
    blue: "🔵",
    brown: "🟤",
    green: "🟢",
    yellow: "🟡",
    red: "🔴",
    orange: "🟠",
    black: "⚫",
    pink: "🩷",
    hazel: "🟤",
    gold: "🟡",
  };

  return colorMap[color.toLowerCase()] || "👁️";
};

/**
 * Debounce function for search
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Calculate age from birth year (BBY/ABY format)
 */
export const calculateAge = (
  birthYear: string,
  referenceYear: number = 0,
): string => {
  if (birthYear === "unknown") return "Unknown";

  const match = birthYear.match(/^([\d.]+)(BBY|ABY)$/);
  if (!match) return birthYear;

  const [, year, era] = match;
  const yearNum = parseFloat(year);

  if (era === "BBY") {
    return `${formatNumber(yearNum + referenceYear)} years`;
  } else {
    return `${formatNumber(referenceYear - yearNum)} years`;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
};

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  const words = name.split(" ");
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

/**
 * Format date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Check if value is unknown/n/a
 */
export const isUnknown = (value: string): boolean => {
  return value === "unknown" || value === "n/a" || value === "none";
};

/**
 * Get avatar color based on name
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52B788",
    "#E76F51",
    "#2A9D8F",
  ];

  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

/**
 * Validate search query
 */
export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length >= 2;
};
