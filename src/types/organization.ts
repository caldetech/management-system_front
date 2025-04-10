import type { OrganizationStatus } from "@/enums/organization-status";
import type { MemberProps } from "./member";

export type OrganizationProps = {
  avatarUrl: string | null;
  createdAt: Date;
  domain: string | null;
  id: string;
  name: string;
  members: MemberProps[];
  ownerId: string;
  shouldAttachUsersByDomain: boolean;
  slug: string;
  status: OrganizationStatus;
  updatedAt: Date;
};
