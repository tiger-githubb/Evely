"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/server/services/local.service";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { CheckIcon, ChevronDown, Languages } from "lucide-react";
import { useTransition } from "react";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "inline-flex items-center justify-between rounded-md px-3 py-2",
            "bg-background text-sm font-medium",
            "text-foreground shadow-sm",
            "hover:bg-accent",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "transition-all duration-200 ease-in-out",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <span className="hidden sm:inline">{items.find((item) => item.value === defaultValue)?.label}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background shadow-lg animate-in fade-in-80"
            position="popper"
            align="end"
            sideOffset={5}
          >
            <Select.Viewport className="p-1">
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  value={item.value}
                  className={clsx(
                    "relative flex items-center gap-2 rounded-sm px-4 py-2 text-sm",
                    "text-foreground",
                    "cursor-pointer select-none",
                    "data-[highlighted]:bg-accent",
                    "outline-none focus:bg-accent"
                  )}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                  {item.value === defaultValue && <CheckIcon className="ml-auto h-4 w-4 text-primary" />}
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
