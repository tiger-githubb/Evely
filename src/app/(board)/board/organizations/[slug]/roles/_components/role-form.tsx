"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomButton } from "@/components/ui/custom/custom-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createRoleSchema, CreateRoleType } from "@/schemas/role.schema";
import { fetchOrganizationModules } from "@/server/services/modules.service";
import { fetchOrganizationPermissions } from "@/server/services/permissions.service";
import { createRole, updateRole } from "@/server/services/roles.service";
import { Role } from "@/types/api/role.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PiPencilSimple } from "react-icons/pi";
import { toast } from "sonner";

interface RoleFormProps {
  organizationId: string;
  role?: Role;
}

export function RoleForm({ organizationId, role }: RoleFormProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: modulesResponse } = useQuery({
    queryKey: ["organization-modules"],
    queryFn: fetchOrganizationModules,
  });

  const { data: permissionsResponse } = useQuery({
    queryKey: ["organization-permissions"],
    queryFn: fetchOrganizationPermissions,
  });

  const form = useForm<CreateRoleType>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: role?.name || "",
      editable: role?.editable ?? true,
      organizationId: Number(organizationId),
      permissionsPerModule:
        role?.permissionsPerModule.map((pm) => ({
          moduleId: pm.module.id,
          permissionId: pm.permission.id,
        })) || [],
    },
  });

  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      toast.success("Rôle créé avec succès");
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["organization-roles"] });
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la création du rôle");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: CreateRoleType) => updateRole(role!.id, values),
    onSuccess: () => {
      toast.success("Rôle modifié avec succès");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["organization-roles"] });
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la modification du rôle");
    },
  });

  const onSubmit = (values: CreateRoleType) => {
    if (role) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {role ? (
          <Button variant="ghost" size="icon">
            <PiPencilSimple className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Créer un rôle
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? "Modifier le rôle" : "Créer un rôle"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du rôle</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du rôle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Permissions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modulesResponse?.data.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="font-medium">{module.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-4">
                        {permissionsResponse?.data.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name="permissionsPerModule"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value.some((pm) => pm.moduleId === module.id && pm.permissionId === permission.id)}
                                    onCheckedChange={(checked) => {
                                      const newValue = checked
                                        ? [...field.value, { moduleId: module.id, permissionId: permission.id }]
                                        : field.value.filter(
                                            (pm) => !(pm.moduleId === module.id && pm.permissionId === permission.id)
                                          );
                                      field.onChange(newValue);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{permission.name}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <CustomButton type="submit" className="w-full" disabled={isSubmitting} isLoading={isSubmitting}>
              {role ? "Modifier le rôle" : "Créer le rôle"}
            </CustomButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
