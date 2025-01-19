import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationItems } from "@/config/navigations-items";
import { routes } from "@/config/routes";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { AuthStatus } from "./auth-status";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ModeToggleFront } from "./mode-toggle-front";
import { SearchForm } from "./search/search-form";
import LocaleSwitcher from "./translate/LocaleSwitcher";
import { MobileSearchTrigger } from "./search/mobile-search-trigger";

export const MainHeader = () => {
  return (
    <header className="w-full top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row  items-center  justify-between">
        <div className="hidden lg:flex items-center max-w-md w-full">
          <LocaleSwitcher />
          <SearchForm />
        </div>

        <div className="flex lg:justify-center">
          <Link href={routes.home} className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        <div className="flex justify-end items-center gap-2">
          <div className="justify-start items-center gap-2 lg:flex hidden flex-row">
            <NavigationMenu className="flex justify-start items-start">
              <NavigationMenuList className="flex justify-start gap-0 flex-row">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.href ? (
                      <>
                        <NavigationMenuLink>
                          <Button variant="ghost" size={"sm"}>
                            {item.title}
                          </Button>
                        </NavigationMenuLink>
                      </>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-xs">{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base">{item.title}</p>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                              </div>
                              <Button size="sm" className="mt-10">
                                Book a call today
                              </Button>
                            </div>
                            <div className="flex flex-col text-sm h-full justify-end">
                              {item.items?.map((subItem) => (
                                <NavigationMenuLink
                                  href={subItem.href}
                                  key={subItem.title}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span>{subItem.title}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
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
          <ModeToggleFront />

          <MobileSearchTrigger />
          <AuthStatus />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
