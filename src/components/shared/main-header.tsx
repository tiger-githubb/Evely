"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationItems } from "@/config/navigations-items"; // Assuming navigationItems is an array
import { routes } from "@/config/routes";
import { MoveRight, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Input } from "../ui/input";
import { AuthStatus } from "./auth-status";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggleFront } from "./mode-toggle-front";
import LocaleSwitcher from "./translate/LocaleSwitcher";

export const MainHeader = () => {
  const t = useTranslations("Common.Placeholders");
  const t2 = useTranslations("navigationItems");

  return (
    <header className="md:w-full pl-4 pr-4 top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row items-center justify-between">
        {/* Search and LocaleSwitcher */}
        <div className="hidden lg:flex items-center max-w-md w-full gap-4">
          <LocaleSwitcher />
          <div className="relative w-full">
            <Input
              type="search"
              placeholder={t("search")}
              className="pl-10 pr-4 py-2 w-full rounded-full border-muted-foreground/20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex lg:justify-center">
          <Link href={routes.home} className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="flex justify-end items-center gap-2">
          <div className="justify-start items-center gap-2 lg:flex hidden flex-row">
            <NavigationMenu className="flex justify-start items-start">
              <NavigationMenuList className="flex justify-start gap-0 flex-row">
                {navigationItems(t2).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      // Simple link case
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>
                          <Button variant="ghost" size="default">
                            {item.title}
                          </Button>
                        </Link>
                      </NavigationMenuLink>
                    ) : (
                      // Dropdown menu case
                      <>
                        <NavigationMenuTrigger className="font-medium text-default">{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            {/* Dropdown Header */}
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base font-medium">{item.title}</p>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                              </div>
                              <Button size="sm" className="mt-10">
                                {t2("bookAcall")}
                              </Button>
                            </div>

                            {/* Dropdown Links */}
                            <div className="flex flex-col text-default h-full justify-end">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink asChild key={subItem.title}>
                                  <Link
                                    href={subItem.href}
                                    className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                  >
                                    <span>{subItem.title}</span>
                                    <MoveRight className="w-4 h-4 text-muted-foreground" />
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Theme Toggle, Auth Status, and Mobile Menu */}
          <ModeToggleFront />
          <AuthStatus />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
