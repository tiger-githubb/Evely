import EventForm from "@/components/shared/board/event-form";

interface CreateEventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CreateEventPage({ params }: CreateEventPageProps) {
  const { slug } = await params;

  return (
    <div className="container">
      <h3>Edit Event {slug} </h3>
      <EventForm />
    </div>
  );
}
