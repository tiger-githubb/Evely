import EditOrganizationForm from "./edit-form";

interface EditOrganizationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditOrganizationPage({ params }: EditOrganizationPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-6">
      <EditOrganizationForm slug={slug} />
    </div>
  );
}
