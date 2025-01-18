"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { createSignUpFormSchema } from "@/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { PiSpinnerGapDuotone } from "react-icons/pi";
import type { z } from "zod";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;
type FormData = z.infer<ReturnType<typeof createSignUpFormSchema>>;

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("SignUpForm");
  const signUpFormSchema = createSignUpFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...data,
        action: "signup",
        redirect: false,
      });

      if (result?.error) {
        setError("root", { message: t("signUpError") });
        return;
      }

      router.push(routes.board.dashboard);
    } catch {
      setError("root", { message: t("unknownError") });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: routes.board.dashboard,
      });
      if (result?.error) {
        setError("root", { message: t("googleSignInError") });
      }
    } catch {
      setError("root", { message: t("unknownError") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">{t("firstNameLabel")}</Label>
              <Input {...register("firstName")} id="firstName" placeholder={t("firstNamePlaceholder")} disabled={isLoading} />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">{t("lastNameLabel")}</Label>
              <Input {...register("lastName")} id="lastName" placeholder={t("lastNamePlaceholder")} disabled={isLoading} />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input {...register("email")} id="email" placeholder={t("emailPlaceholder")} type="email" disabled={isLoading} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">{t("passwordLabel")}</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">{t("passwordConfirmationLabel")}</Label>
            <Input
              {...register("password_confirmation")}
              id="password_confirmation"
              type="password"
              placeholder={t("passwordConfirmationPlaceholder")}
              disabled={isLoading}
            />
            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
          </div>

          {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

          <Button className="w-full" disabled={isLoading}>
            {isLoading && <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" />}
            {t("signUpButton")}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("orContinueWith")}</span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading} onClick={handleGoogleSignIn} className="w-full">
        {isLoading ? <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" /> : <FcGoogle className="mr-2 h-4 w-4" />}
        {t("googleButton")}
      </Button>

      <div className="text-center text-sm">
        {t("alreadyHaveAccount")}{" "}
        <Link href={routes.auth.signIn} className="font-semibold text-primary hover:underline">
          {t("signInLink")}
        </Link>
      </div>
    </div>
  );
}
