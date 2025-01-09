"use client";

import { BadgeCell } from "@/components/shared/table/badge-cell";
import { OrganizationDetailsSkeleton } from "@/components/shared/ui-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchOrganizationRoles } from "@/server/services/roles.service";
import { useQuery } from "@tanstack/react-query";
import { Shield, XCircle } from "lucide-react";

interface RoleDetailsDialogProps {
  roleId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleDetailsDialog({ roleId, open, onOpenChange }: RoleDetailsDialogProps) {
  const {
    data: roleResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["role", roleId],
    queryFn: () => fetchOrganizationRoles(),
    enabled: open,
  });

  const role = roleResponse?.data.find((r) => r.id.toString() === roleId);

  // Group permissions by module
  const groupedPermissions = role?.permissionsPerModule.reduce((acc, curr) => {
    const moduleName = curr.module.name;
    if (!acc[moduleName]) {
      acc[moduleName] = [];
    }
    acc[moduleName].push(curr.permission);
    return acc;
  }, {} as Record<string, Array<{ id: number; name: string }>>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between pt-8">
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {role?.name}
            </DialogTitle>
            <BadgeCell value={role?.editable ? "Personnalisé" : "Système"} variant={role?.editable ? "default" : "secondary"} />
          </div>
        </DialogHeader>

        {isLoading ? (
          <OrganizationDetailsSkeleton />
        ) : error ? (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                Une erreur est survenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Impossible de charger les détails du rôle. Veuillez réessayer plus tard.</p>
            </CardContent>
          </Card>
        ) : (
          role &&
          groupedPermissions && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Module</TableHead>
                  <TableHead>Permissions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedPermissions).map(([moduleName, permissions]) => (
                  <TableRow key={moduleName}>
                    <TableCell className="font-medium">{moduleName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {permissions.map((permission) => (
                          <BadgeCell key={permission.id} value={permission.name} variant="outline" />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
