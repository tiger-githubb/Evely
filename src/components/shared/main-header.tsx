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
import { MoveRight, Search } from "lucide-react";
import Link from "next/link";
import { PiCheersDuotone } from "react-icons/pi";
import { Input } from "../ui/input";
import { AuthStatus } from "./auth-status";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";
import { ModeToggleFront } from "./mode-toggle-front";

export const MainHeader = () => {
  return (
    <header className="w-full top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row  items-center  justify-between">
        <div className="hidden lg:flex items-center max-w-md w-full">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full rounded-full border-muted-foreground/20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
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
                        <NavigationMenuTrigger className="font-medium text-xs">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base">{item.title}</p>
                                <p className="text-muted-foreground text-sm">
                                  {item.description}
                                </p>
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

          <AuthStatus />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
