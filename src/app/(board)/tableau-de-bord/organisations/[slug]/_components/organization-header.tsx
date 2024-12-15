import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Organization } from "@/types/api/organization.type";
import { getImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import Link from "next/link";
import { PiPencilSimpleDuotone } from "react-icons/pi";

interface OrganizationHeaderProps {
  organization: Organization;
}

export function OrganizationHeader({ organization }: OrganizationHeaderProps) {
  return (
    <div className="mt-0">
      <div className="relative -mx-4 h-36 sm:h-40 md:h-48 lg:-mx-6 lg:h-52 xl:h-60 2xl:h-72">
        {organization.coverImage ? (
          <Image src={getImageUrl(organization.coverImage)} alt="Cover" fill className="object-cover" priority />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF]" />
        )}
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-4">
            <div className="relative -mt-16 sm:-mt-20 lg:-mt-24">
              <div className="aspect-square w-24 sm:w-28 md:w-32 lg:w-36 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                <Image
                  src={getImageUrl(organization.logo)}
                  alt={organization.name}
                  width={144}
                  height={144}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="py-2">
              <h1 className="text-lg font-bold capitalize text-gray-900 sm:text-xl lg:text-2xl">{organization.name}</h1>
              {organization.website && (
                <Link
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {" "}
                  {organization.website}
                </Link>
              )}
              <ul className=" flex flex-wrap items-center gap-4 text-sm lg:text-base">
                <li className="flex items-center">
                  <span className="font-semibold ">{organization._count.followers}</span>
                  <span className="ml-1.5 text-gray-500">Abonnés</span>
                </li>
                <li className="flex items-center">
                  <span className="font-semibold ">{organization._count.users}</span>
                  <span className="ml-1.5 text-gray-500">Membres</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link href={routes.board.organization.edit(organization.id.toString())}>
              <Button size="icon" className="h-10 w-10">
                <PiPencilSimpleDuotone className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
