import { Categories } from "@/components/sections/categories";
import { EventTable } from "@/components/sections/event-table";
import { Hero } from "@/components/sections/hero";
import { Divider } from "@/components/shared/divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Divider />
      <EventTable />
    </>
  );
}
