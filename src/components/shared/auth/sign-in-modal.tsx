import { SignInForm } from "@/app/(front)/auth/sign-in/_components/sign-in-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SignInModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignInModal({ isOpen, onOpenChange }: SignInModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Connexion</DialogTitle>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
