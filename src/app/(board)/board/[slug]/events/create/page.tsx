import EventForm from "@/components/shared/board/event-form";



export default async function CreateEventPage() {

  return (
    <div className="container">
      <h3>Create New Event </h3>
      <EventForm />
    </div>
  );
}
