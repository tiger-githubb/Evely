import Section from "@/components/ui/custom/section";
import { Suspense } from "react";
import SearchContainer from "./_components/search-container";

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
      <Suspense>
        <SearchContainer searchTerm={searchTerm} />
      </Suspense>
    </Section>
  );
}
