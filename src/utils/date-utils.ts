"use client";

import { useFormatter, useTranslations } from "next-intl";

export function FormattedDate({ dateString }: { dateString: string | null }) {
  const t = useTranslations("FormattedDate");
  const formatter = useFormatter();

  if (!dateString) return t("na");

  try {
    const date = new Date(dateString);
    return formatter.dateTime(date, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return t("invalidDate");
  }
}

export function FormattedTime({ timeString }: { timeString: string | null }) {
  const t = useTranslations("FormattedTime");
  const formatter = useFormatter();

  if (!timeString) return t("na");

  try {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return formatter.dateTime(date, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return t("invalidTime");
  }
}
