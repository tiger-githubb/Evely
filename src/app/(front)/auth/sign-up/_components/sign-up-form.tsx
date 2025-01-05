"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { signUpFormSchema } from "@/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { PiGoogleLogoDuotone, PiSpinnerGapDuotone } from "react-icons/pi";
import type { z } from "zod";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;
type FormData = z.infer<typeof signUpFormSchema>;

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        action: "signup",
        redirect: false,
      });

      if (result?.error) {
        setError("root", { message: "Erreur lors de l'inscription" });
        return;
      }

      router.push(routes.board.dashboard);
    } catch (error) {
      console.error(error);
      setError("root", { message: "Une erreur est survenue" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                {...register("firstName")}
                id="firstName"
                placeholder="John"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                {...register("lastName")}
                id="lastName"
                placeholder="Doe"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
              />
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input {...register("password")} id="password" type="password" placeholder="Votre mot de passe" disabled={isLoading} />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <Input
              {...register("password_confirmation")}
              id="password_confirmation"
              type="password"
              placeholder="Confirmez votre mot de passe"
              disabled={isLoading}
            />
            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
          </div>

          {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

          <Button className="w-full" disabled={isLoading}>
            {isLoading && <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" />}
            S&apos;inscrire
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" /> : <PiGoogleLogoDuotone className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
}
