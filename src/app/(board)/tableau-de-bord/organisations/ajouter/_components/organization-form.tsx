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
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";
interface OrganizationFormProps {
  organisation?: Organization;
}

export function OrganizationForm({ organisation }: OrganizationFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<CreateOrganizationType>({
    resolver: zodResolver(createOrganizationSchema),
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
      toast.success("Organisation créée avec succès");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création de l'organisation");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: CreateOrganizationType) => updateOrganization(organisation!.id.toString(), values),
    onSuccess: () => {
      toast.success("Organisation modifiée avec succès");
      queryClient.invalidateQueries({
        queryKey: ["organizations", organisation?.id.toString()],
      });
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la modification de l'organisation");
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
        <CardTitle> {organisation ? "Modifier l'organisation" : "Créer une organisation"}</CardTitle>
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
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} className="w-40 h-40" />
                    </FormControl>
                    <FormDescription>Format accepté: .jpg, .jpeg, .png et .webp. Max 5MB</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image de couverture</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} className="w-full aspect-video" />
                    </FormControl>
                    <FormDescription>Format accepté: .jpg, .jpeg, .png et .webp. Max 5MB</FormDescription>
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
                    <FormLabel>Nom de l&apos;organisation</FormLabel>
                    <FormControl>
                      <Input placeholder="Mon organisation" {...field} />
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
                    <FormLabel>Site web</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.monsite.com" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-32" placeholder="Décrivez votre organisation..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CustomButton type="submit" className="w-full text-white font-semibold" isLoading={isSubmitting} disabled={isSubmitting}>
              {organisation ? "Modifier l'organisation" : "Créer l'organisation"}
            </CustomButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
