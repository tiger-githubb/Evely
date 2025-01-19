import { SignInForm } from "@/app/(front)/auth/sign-in/_components/sign-in-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface SignInModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ isOpen, onOpenChange }: SignInModalProps) {
  const t = useTranslations("signInModal");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{t("title")}</DialogTitle>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
