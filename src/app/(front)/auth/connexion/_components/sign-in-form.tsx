"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { PiGoogleLogoDuotone, PiSpinnerGapDuotone } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { signInSchema as SignInType } from "@/schemas/sign-in.schema";
import { signInSchema } from "@/schemas/sign-in.schema";

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

  async function onSubmit(data: SignInType) {
    setIsLoading(true);
    try {
      // Implement your sign in logic here
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              {...form.register("password")}
              placeholder="Mot de passe"
              id="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
            />
            {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <PiSpinnerGapDuotone className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
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
