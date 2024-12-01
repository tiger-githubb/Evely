import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children, className, ...props }) => {
  return (
    <section className={cn("container mx-auto my-4 px-4 md:my-24", className)} {...props}>
      {children}
    </section>
  );
};

export default Section;
