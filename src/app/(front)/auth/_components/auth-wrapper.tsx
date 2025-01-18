import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuthCarousel } from "./auth-carousel";

type QuoteSlide = {
  quote: string;
  author: string;
  image: string;
};

type AuthWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  slides?: QuoteSlide[];
  showLegalNotice?: boolean;
};

export function AuthWrapper({ children, title, description, linkText, linkHref, slides, showLegalNotice = true }: AuthWrapperProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden">
        <Link href={linkHref} className={cn(buttonVariants({ variant: "link" }), "absolute right-4 top-4 md:right-8 md:top-8 z-50")}>
          {linkText}
        </Link>
      </div>

      {slides && (
        <div className="relative hidden h-full lg:flex bg-muted">
          <div className="z-20 flex items-center text-lg font-medium p-10 text-white absolute">Yala</div>
          <AuthCarousel slides={slides} />
        </div>
      )}

      <div className="w-full flex items-center justify-center lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-xl sm:text-3xl lg:text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="container mx-auto my-4 px-4">{children}</div>
          {showLegalNotice && (
            <p className="px-8 text-center text-sm text-muted-foreground">
              En continuant, vous acceptez nos{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Conditions d&apos;utilisation
              </Link>{" "}
              et notre{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Politique de confidentialité
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
