import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { PiEye, PiPencilSimple, PiSpinner, PiTrash } from "react-icons/pi";

interface ActionButtonsProps {
  onView?: (() => void) | string;
  onEdit?: (() => void) | string;
  onDelete?: () => void;
  isDeleting?: boolean;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  deleteMessage?: string;
}
export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  isDeleting,
  viewLabel = "Voir les détails",
  editLabel = "Modifier",
  deleteLabel = "Supprimer",
  deleteMessage = "Êtes-vous sûr de vouloir supprimer cet élément ?",
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {onView && (
          <Tooltip>
            <TooltipTrigger asChild>
              {typeof onView === "string" ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={onView}>
                    <PiEye className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={onView}>
                  <PiEye className="h-4 w-4" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{viewLabel}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {onEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              {typeof onEdit === "string" ? (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={onEdit}>
                    <PiPencilSimple className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <PiPencilSimple className="h-4 w-4" />
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{editLabel}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={isDeleting}>
                    {isDeleting ? <PiSpinner className="animate-spin" /> : <PiTrash className="h-4 w-4 text-destructive" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="leading-none font-bold">{deleteLabel}</p>
                      <span className="text-sm">{deleteMessage}</span>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" disabled={isDeleting}>
                        Annuler
                      </Button>

                      <Button variant="destructive" size="sm" onClick={onDelete} disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Supprimer"}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent>
              <p>{deleteLabel}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}
