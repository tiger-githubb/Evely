import { Categories } from "@/components/sections/categories";
import { EventTable } from "@/components/sections/event-table";
import { Hero } from "@/components/sections/hero";
import { Divider } from "@/components/shared/divider";
import Section from "@/components/ui/custom/section";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Divider />
      <Section>
        <EventTable />
      </Section>
    </>
  );
}
