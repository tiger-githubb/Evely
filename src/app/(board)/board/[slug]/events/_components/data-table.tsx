"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { routes } from "@/config/routes";
import { deleteEvent, fetchOrganizationEvents, updateEventPublishStatus } from "@/server/services/events.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Columns } from "./columns";

export default function EventsTable() {
  const t = useTranslations("eventsdashboard");
  const queryClient = useQueryClient();
  const router = useRouter();
  const { activeOrganization } = useOrganizationStore();

  // Ensure activeOrganization is available
  const organizationSlug = activeOrganization?.slug;
  const organizationId = activeOrganization?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-events", organizationSlug, organizationId],
    queryFn: () => {
      if (!organizationSlug) {
        return Promise.reject(t("loadingError"));
      }
      return fetchOrganizationEvents(organizationId || 0);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => {
      if (organizationId === undefined) {
        throw new Error("Organization ID is undefined");
      }
      return deleteEvent(organizationId, eventId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-events"] });
      toast.success(t("deleteSuccess"));
    },
    onError: () => toast.error(t("deleteError")),
  });

  const handleDelete = (eventId: number) => {
    if (confirm(t("deleteEvent"))) {
      deleteMutation.mutate(eventId);
    }
  };

  // Handle publish/depublish toggle
  const handlePublishToggle = async (eventId: number, draft: boolean) => {
    try {
      if (organizationId !== undefined) {
        await updateEventPublishStatus(organizationId, eventId, draft);
      } else {
        toast.error("Organization ID is undefined");
      }
      toast.success(draft ? t("unpublishSuccess") : t("publishSuccess"));
      queryClient.invalidateQueries({ queryKey: ["organization-events"] }); // Refresh the event list
    } catch (error) {
      console.log(error);

      toast.error(t("publishError"));
    }
  };
  const handleView = (eventSlug: string) => {
    if (organizationSlug) {
      router.push(routes.board.workspace.events.show(organizationSlug, eventSlug));
    } else {
      toast.error("Organization slug is undefined");
    }
  };

  return (
    <CustomDataTable
      columns={Columns(handleView, handleDelete, handlePublishToggle)}
      data={data?.data || []}
      isLoading={isLoading}
      error={error}
      filterColumn="title"
      errorMessage={t("loadingError")}
      rowsPerPage={10}
      noResultsMessage={t("noResults")}
    />
  );
}
