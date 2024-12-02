import { cn } from "@/lib/utils";

interface DividerProps {
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const Divider = ({ title, description, className, titleClassName, descriptionClassName }: DividerProps) => {
  if (!title && !description) {
    return <div className={cn("h-px w-full bg-border", className)} />;
  }

  return (
    <div className={cn("relative flex items-center gap-8 py-20", className)}>
      <div className="h-px w-full bg-border" />
      {title && (
        <div className="flex flex-col gap-2 whitespace-nowrap">
          <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight", titleClassName)}>{title}</h2>
          {description && <p className={cn("text-base text-muted-foreground max-w-md", descriptionClassName)}>{description}</p>}
        </div>
      )}
      <div className="h-px w-full bg-border" />
    </div>
  );
};
