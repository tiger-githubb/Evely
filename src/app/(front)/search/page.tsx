import Section from "@/components/ui/custom/section";
import { SearchErrorBoundary } from "./_components/error-boundary";
import SearchContainerClient from "./_components/search-container-client";

interface SearchPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchTerm = params.search || "";
  console.log("Search query:", searchTerm);

  return (
    <Section>
      <SearchErrorBoundary>
        <SearchContainerClient searchTerm={searchTerm} />
      </SearchErrorBoundary>
    </Section>
  );
}
