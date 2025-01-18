import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUiTranslations } from "@/hooks/use-ui-translations";
import { AlertCircle, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export function EmptyState({
  icon = <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />,
  title,
  description,
}: EmptyStateProps) {
  const t = useUiTranslations();
  const defaultTitle = t("noItemsFound");
  const defaultDescription = t("noItemsDescription");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-96 bg-muted/10 rounded-lg border-2 border-dashed">
      <div className="bg-background p-4 rounded-full shadow-sm mb-4">{icon}</div>
      <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        {title ?? defaultTitle}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-sm">{description ?? defaultDescription}</p>
    </div>
  );
}
export function ErrorState({
  title,
  description,
  variant = "alert",
}: {
  title?: string;
  description?: string;
  variant?: "alert" | "xl";
}) {
  const t = useUiTranslations();
  const defaultTitle = t("errorTitle");
  const defaultDescription = t("errorDescription");

  if (variant === "xl") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-96 bg-red-50/50 dark:bg-red-950/20 rounded-lg border-2 border-red-200/20 border-dashed">
        <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-full shadow-sm mb-4">
          <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">{title ?? defaultTitle}</h3>
        <p className="text-red-600/80 dark:text-red-400/80 mt-2 max-w-sm">{description ?? defaultDescription}</p>
      </div>
    );
  }

  return (
    <Alert variant="destructive" className="mb-4 border-2 animate-appear shadow-lg">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-destructive/20 rounded-full">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <AlertTitle className="text-lg font-bold">{title ?? defaultTitle}</AlertTitle>
          <AlertDescription className="mt-1 text-sm opacity-90">{description ?? defaultDescription}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

export function SuccessState({
  title,
  description,
  variant = "alert",
}: {
  title?: string;
  description?: string;
  variant?: "alert" | "xl";
}) {
  const t = useUiTranslations();
  const defaultTitle = t("successTitle");
  const defaultDescription = t("successDescription");

  if (variant === "xl") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-96 bg-green-50/50 dark:bg-green-950/20 rounded-lg border-2 border-green-200/20 border-dashed">
        <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-full shadow-sm mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">{title ?? defaultTitle}</h3>
        <p className="text-green-600/80 dark:text-green-400/80 mt-2 max-w-sm">{description ?? defaultDescription}</p>
      </div>
    );
  }

  return (
    <Alert variant="default" className="border-2 border-green-500/20 bg-green-50/50 dark:bg-green-950/20 animate-appear shadow-lg">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-green-500/20 rounded-full">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <AlertTitle className="text-lg font-bold text-green-700 dark:text-green-300">{title ?? defaultTitle}</AlertTitle>
          <AlertDescription className="mt-1 text-sm text-green-600 dark:text-green-400">
            {description ?? defaultDescription}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}

export function WarningState({
  title,
  description,
  variant = "alert",
}: {
  title?: string;
  description?: string;
  variant?: "alert" | "xl";
}) {
  const t = useUiTranslations();
  const defaultTitle = t("warningTitle");
  const defaultDescription = t("warningDescription");

  if (variant === "xl") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center h-96 bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg border-2 border-yellow-200/20 border-dashed">
        <div className="bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-full shadow-sm mb-4">
          <AlertTriangle className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">{title ?? defaultTitle}</h3>
        <p className="text-yellow-600/80 dark:text-yellow-400/80 mt-2 max-w-sm">{description ?? defaultDescription}</p>
      </div>
    );
  }

  return (
    <Alert
      variant="destructive"
      className="border-2 border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-950/20 animate-appear shadow-lg"
    >
      <div className="flex items-center gap-2">
        <div className="p-2 bg-yellow-500/20 rounded-full">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <AlertTitle className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{title ?? defaultTitle}</AlertTitle>
          <AlertDescription className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
            {description ?? defaultDescription}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
