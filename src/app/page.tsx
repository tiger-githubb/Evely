import { Categories } from "@/components/sections/categories";
import { Hero } from "@/components/sections/hero";
import { Divider } from "@/components/shared/divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Divider />
    </>
  );
}
