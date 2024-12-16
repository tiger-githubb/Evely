"use client";

import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import { OrganizationDetailsSkeleton } from "@/components/shared/ui-skeletons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchOrganizationUsers } from "@/server/services/organizations.service";
import { PermissionModule } from "@/types/api/permission-module.type";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Mail, Shield, User, XCircle } from "lucide-react";

interface MemberDetailsDialogProps {
  memberId: string;
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MemberDetailsDialog({ memberId, organizationId, open, onOpenChange }: MemberDetailsDialogProps) {
  const {
    data: memberResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["organization-member", organizationId, memberId],
    queryFn: () => fetchOrganizationUsers(organizationId),
    enabled: open,
  });

  const member = memberResponse?.data[0];
  const groupPermissionsByModule = (permissionsPerModule: PermissionModule[]) => {
    const grouped = permissionsPerModule.reduce((acc, curr) => {
      const moduleName = curr.module.name;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push(curr.permission.name);
      return acc;
    }, {} as Record<string, string[]>);

    return Object.entries(grouped).map(([module, permissions]) => ({
      module,
      permissions,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails du membre</DialogTitle>
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
              <p className="text-muted-foreground">Impossible de charger les détails du membre. Veuillez réessayer plus tard.</p>
            </CardContent>
          </Card>
        ) : (
          member && (
            <div className="space-y-6">
              {/* Member Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p className="text-lg font-medium">
                        {member.user.firstName} {member.user.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-lg font-medium">{member.user.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role Info */}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Rôle et permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-2">
                    <BadgeCell value={member.role.name} variant="default" />
                    {!member.role.editable && <BadgeCell value="Rôle système" variant="secondary" />}
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Permissions par module</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupPermissionsByModule(member.role.permissionsPerModule).map(({ module, permissions }) => (
                        <Card key={module} className="border border-muted">
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm font-medium">{module}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="flex flex-wrap gap-2">
                              {permissions.map((permission) => (
                                <BadgeCell key={`${module}-${permission}`} value={permission} variant="outline" />
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Membership Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Informations d&apos;adhésion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Membre depuis <DateCell date={member.createdAt} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
