"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createOrganizationSchema, CreateOrganizationType } from "@/schemas/organization.schema";
import { createOrganization, updateOrganization } from "@/server/services/organizations.service";
import { Organization } from "@/types/api/organization.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";

interface OrganizationFormProps {
  organisation?: Organization;
}

export function OrganizationForm({ organisation }: OrganizationFormProps) {
  const t = useTranslations("organizationForm");
  const queryClient = useQueryClient();

  const form = useForm<CreateOrganizationType>({
    resolver: zodResolver(createOrganizationSchema(t)),
    defaultValues: {
      name: organisation?.name || "",
      description: organisation?.description || "",
      website: organisation?.website || "",
      logo: organisation?.logo || (null as unknown as File),
      coverImage: organisation?.coverImage || (null as unknown as File),
    },
  });

  const createMutation = useMutation({
    mutationFn: createOrganization,
    onSuccess: () => {
      toast.success(t("createSuccess"));
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: () => {
      toast.error(t("createError"));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: CreateOrganizationType) => updateOrganization(organisation!.id.toString(), values),
    onSuccess: () => {
      toast.success(t("editSuccess"));
      queryClient.invalidateQueries({
        queryKey: ["organizations", organisation?.id.toString()],
      });
    },
    onError: () => {
      toast.error(t("editError"));
    },
  });

  const onSubmit: SubmitHandler<CreateOrganizationType> = (values) => {
    if (organisation) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{organisation ? t("editTitle") : t("createTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-1">
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("logoLabel")}</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} className="w-40 h-40" />
                    </FormControl>
                    <FormDescription>{t("logoDescription")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("coverImageLabel")}</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} className="w-full aspect-video" />
                    </FormControl>
                    <FormDescription>{t("coverImageDescription")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nameLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("websiteLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("websitePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("descriptionLabel")}</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-32" placeholder={t("descriptionPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomButton type="submit" className="w-full text-white font-semibold" isLoading={isSubmitting} disabled={isSubmitting}>
              {organisation ? t("editButton") : t("createButton")}
            </CustomButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
