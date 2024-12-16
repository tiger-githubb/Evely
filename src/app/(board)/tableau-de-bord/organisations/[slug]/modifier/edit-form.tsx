"use client";

import { getOrganization } from "@/server/services/organizations.service";
import { useQuery } from "@tanstack/react-query";
import { OrganizationForm } from "../../ajouter/_components/organization-form";

export default function EditOrganizationForm({ slug }: { slug: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["organization", slug],
    queryFn: () => getOrganization(slug),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error: {error.message}</div>;
  const organization = data?.data;

  return <OrganizationForm organisation={organization} />;
}
