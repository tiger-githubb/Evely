interface EventsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationEventsPage({ params }: EventsPageProps) {
  const { slug } = await params;

  return (
    <div className="container">
      <h1>Events List {slug} </h1>
    </div>
  );
}
