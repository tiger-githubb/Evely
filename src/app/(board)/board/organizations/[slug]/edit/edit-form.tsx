"use client";

import { fetchOrganization } from "@/server/services/organizations.service";
import { useQuery } from "@tanstack/react-query";
import { OrganizationForm } from "../../create/_components/organization-form";

export default function EditOrganizationForm({ slug }: { slug: string }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["organization", slug],
    queryFn: () => fetchOrganization(slug),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error: {error.message}</div>;
  const organization = data?.data;

  return <OrganizationForm organisation={organization} />;
}
