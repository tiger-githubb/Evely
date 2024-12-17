import { Organization } from "@/types/api/organization.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationState {
  activeOrganization: Organization | null;
  setActiveOrganization: (organization: Organization | null) => void;
  clearActiveOrganization: () => void;
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      activeOrganization: null,
      setActiveOrganization: (organization) => set({ activeOrganization: organization }),
      clearActiveOrganization: () => set({ activeOrganization: null }),
    }),
    {
      name: "organization-storage",
    }
  )
);
