import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface AvatarCellProps {
  image?: string;
  name: string;
  description?: string;
  className?: string;
  fallback?: string;
  showHoverCard?: boolean;
}

export function AvatarCell({ image, name, description, className, fallback, showHoverCard = true }: AvatarCellProps) {
  const AvatarComponent = (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>{fallback || name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );

  if (!showHoverCard) return AvatarComponent;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{AvatarComponent}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} />
            <AvatarFallback>{fallback || name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
