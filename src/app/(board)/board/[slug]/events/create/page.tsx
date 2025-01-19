import EventForm from "@/components/shared/board/event-form";
import { getTranslations } from "next-intl/server";

export default async function CreateEventPage() {
  const t = await getTranslations("createEventPage");

  return (
    <div className="container flex flex-col gap-6 items-center">
      <h2>{t("title")}</h2>
      <EventForm />
    </div>
  );
}
