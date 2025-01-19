"use client";

import { Button } from "@/components/ui/button";
import { navigationItems } from "@/config/navigations-items";
import { Menu, MoveRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations("navigationItems");

  return (
    <div className="flex w-12 shrink lg:hidden items-end justify-end">
      <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <div className="absolute top-20 flex flex-col w-full right-0 bg-background/95 backdrop-blur-sm shadow-lg divide-y divide-border/50">
          {navigationItems(t).map((item) => (
            <div key={item.title} className="container py-6">
              <div className="container px-6">
                {item.href ? (
                  <Link href={item.href} className="flex justify-between items-center p-2 -mx-2 rounded-md hover:bg-accent">
                    <span className="text-lg font-medium">{item.title}</span>
                    <MoveRight className="w-5 h-5 stroke-[1.5] text-muted-foreground" />
                  </Link>
                ) : (
                  <div className="space-y-4 p-2 -mx-2">
                    <div>
                      <p className="text-lg font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>

                    {item.items && (
                      <div className="space-y-2 mt-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="flex justify-between items-center p-2 -mx-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
                          >
                            <span className="text-sm">{subItem.title}</span>
                            <MoveRight className="w-4 h-4 stroke-[1.5]" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
