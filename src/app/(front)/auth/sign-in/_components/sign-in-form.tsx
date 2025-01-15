"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiSpinnerGapDuotone } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc"; // Google Icon

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { signInSchema as SignInType } from "@/schemas/sign-in.schema";
import { signInSchema } from "@/schemas/sign-in.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email ou mot de passe incorrect");
      } else {
        toast.success("Connexion réussie, redirection vers l'accueil");
        window.location.href = routes.home;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: routes.home,
      });
      if (result?.error) {
        toast.error("Erreur lors de la connexion avec Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              {...form.register("email")}
              id="email"
              placeholder="nom@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              {...form.register("password")}
              id="password"
              placeholder="Mot de passe"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={routes.auth.forgotPassword}
            className="text-sm text-muted-foreground underline hover:text-primary"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <Button type="submit" size="lg" disabled={isLoading} className="w-full">
          {isLoading && (
            <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" />
          )}
          Se connecter
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center"
      >
        {isLoading ? (
          <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Continuer avec Google
      </Button>

      <div className="text-center text-sm">
        Vous n&apos;avez pas de compte ?{" "}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-primary hover:underline"
        >
          Créez-en un
        </Link>
      </div>
    </div>
  );
}
