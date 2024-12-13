export interface CreateOrganizationDto {
  name: string;
  logo: File;
  coverImage: File;
  description: string;
  website?: string;
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}
