import Section from "@/components/ui/custom/section";
import { Suspense } from "react";
import SearchContainer from "./_components/search-container";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <Section>
      <Suspense>
        <SearchContainer searchTerm={searchParams.q || ""} />
      </Suspense>
    </Section>
  );
}
