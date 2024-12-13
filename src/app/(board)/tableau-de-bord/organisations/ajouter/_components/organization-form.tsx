"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateOrganizationSchema, createOrganizationSchema } from "@/schemas/organization.schema";
import { createOrganization } from "@/server/services/organizations.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ImageUpload } from "./image-upload";

export function OrganizationForm() {
  const form = useForm<CreateOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      logo: null as unknown as File,
      coverImage: null as unknown as File,
    },
  });

  const onSubmit: SubmitHandler<CreateOrganizationSchema> = async (values) => {
    try {
      await createOrganization(values);
      toast.success("Organisation créée avec succès");

      form.reset();
    } catch (error: unknown) {
      console.log(error);
      toast.error("Une erreur est survenue lors de la création de l'organisation");
    }
  };
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Créer une organisation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez votre organisation..." {...field} />
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

            <Button type="submit" className="w-full">
              Créer l&apos;organisation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
