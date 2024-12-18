interface WorkspacePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OrganizationWorkspacePage({ params }: WorkspacePageProps) {
  const { slug } = await params;

  return (
    <div className="container">
      <h1>Organization Workspace {slug} </h1>
    </div>
  );
}
