import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  name?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  description?: string;
  variant?: "default" | "withTitle";
  imageSrc?: string;
}

export default function InfoCard({ name, title, subtitle, className, description, variant = "default", imageSrc }: InfoCardProps) {
  if (variant === "withTitle") {
    return (
      <figure className={cn("flex flex-col gap-2", className)}>
        {title && <span className="font-lexend span-lg font-semibold">{title}</span>}
        {subtitle && <span className="font-lexend span-sm font-medium span-gray-700 dark:span-gray-500">{subtitle}</span>}
        {description && (
          <span className="span-[13px] span-gray-500 line-clamp-3 overflow-hidden" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </figure>
    );
  }

  return (
    <figure className={cn("flex items-center gap-6", className)}>
      {imageSrc && (
        <Avatar className="h-12 w-12 ">
          <AvatarImage src={imageSrc} alt={name} className="w-full h-full object-cover" />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <figcaption className="grid gap-0.5">
        <span className="font-lexend span-sm font-bold span-gray-900 dark:span-gray-700">{name}</span>
        {description && (
          <span className="span-[13px] text-gray-500 line-clamp-3 overflow-hidden" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </figcaption>
    </figure>
  );
}
