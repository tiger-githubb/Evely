import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formats a date string into a more readable format (e.g., "17 janvier 2025").
 * @param dateString - ISO date string (e.g., "2025-01-17").
 * @returns Formatted date string.
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "N/A";
  try {
    return format(parseISO(dateString), "d MMMM yyyy", { locale: fr });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}

/**
 * Formats a time string into a 24-hour format (e.g., "10:00").
 * @param timeString - Time string (e.g., "10:00:00").
 * @returns Formatted time string.
 */
export function formatTime(timeString: string | null): string {
  if (!timeString) return "N/A";
  try {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
}
