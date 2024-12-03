"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/config/routes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const AuthStatus = () => {
  const { data: session } = useSession();

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex justify-end w-full gap-4">
      <div className="border-r hidden md:inline"></div>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>{getUserInitials(session.user.name || "U")}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={routes.board.dashboard}>Tableau de bord</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={routes.board.profile}>Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={routes.board.myevents}>Mes événements</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href={routes.auth.signIn}>
            <Button variant="outline">Connexion</Button>
          </Link>
          <Link href={routes.auth.signUp}>
            <Button>Inscription</Button>
          </Link>
        </>
      )}
    </div>
  );
};
