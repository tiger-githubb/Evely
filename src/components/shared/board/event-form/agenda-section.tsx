"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreateEventType } from "@/schemas/event.schema";
import { PlusCircle, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface AgendaSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function AgendaSection({ form }: AgendaSectionProps) {
  const t = useTranslations("agendaSection");

  const {
    fields: agendaFields,
    append: appendAgenda,
    remove: removeAgenda,
  } = useFieldArray({
    control: form.control,
    name: "agendas",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{t("agendaTitle")}</h3>
        <Button type="button" variant="outline" size="sm" onClick={() => appendAgenda({ title: "", sessions: [] })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("addAgenda")}
        </Button>
      </div>

      {agendaFields.map((agendaField, agendaIndex) => (
        <div key={agendaField.id} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name={`agendas.${agendaIndex}.title`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("agendaTitleLabel")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" className="ml-2" onClick={() => removeAgenda(agendaIndex)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <SessionsField form={form} agendaIndex={agendaIndex} />
        </div>
      ))}
    </div>
  );
}

interface SessionsFieldProps {
  form: UseFormReturn<CreateEventType>;
  agendaIndex: number;
}

function SessionsField({ form, agendaIndex }: SessionsFieldProps) {
  const t = useTranslations("agendaSection");

  const {
    fields: sessionFields,
    append: appendSession,
    remove: removeSession,
  } = useFieldArray({
    control: form.control,
    name: `agendas.${agendaIndex}.sessions`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{t("sessionsTitle")}</h4>
        <Button type="button" variant="outline" size="sm" onClick={() => appendSession({ title: "", startTime: "", endTime: "" })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("addSession")}
        </Button>
      </div>

      {sessionFields.map((sessionField, sessionIndex) => (
        <div key={sessionField.id} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-4">
          <FormField
            control={form.control}
            name={`agendas.${agendaIndex}.sessions.${sessionIndex}.title`}
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{t("sessionTitleLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`agendas.${agendaIndex}.sessions.${sessionIndex}.startTime`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("startTimeLabel")}</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name={`agendas.${agendaIndex}.sessions.${sessionIndex}.endTime`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("endTimeLabel")}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeSession(sessionIndex)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
