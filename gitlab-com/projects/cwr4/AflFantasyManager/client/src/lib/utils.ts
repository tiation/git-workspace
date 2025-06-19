import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  } else {
    return `$${value}`;
  }
}

export function formatScore(value: number | undefined): string {
  if (value === undefined) return "-";
  return value.toString();
}

export function getPositionColor(position: string): string {
  switch (position) {
    case "MID":
      return "text-blue-500";
    case "FWD":
      return "text-green-500";
    case "DEF":
      return "text-red-500";
    case "RUCK":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "Premium":
      return "text-accent";
    case "Mid-Pricer":
      return "text-yellow-500";
    case "Rookie":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
}

export const playerCategories = ["Premium", "Mid-Pricer", "Rookie"];
export const playerPositions = ["MID", "FWD", "DEF", "RUCK"];

export type PlayerPosition = "MID" | "FWD" | "DEF" | "RUCK";
export type PlayerCategory = "Premium" | "Mid-Pricer" | "Rookie";
