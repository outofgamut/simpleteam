import { useRouter } from "next/router";

import { useTeam } from "@/context/team-context";
import { View } from "@prisma/client";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { DocumentWithVersion, LinkWithViews, OrganizationUser, PeopleWithSkillsAndRoles, SkillWithTags } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export function useUsers() {
  const router = useRouter();
  const teamInfo = useTeam();

  const { id } = router.query as {
    id: string;
  };

  const { data: users, error } = useSWR<OrganizationUser[]>(
    teamInfo?.currentTeam?.id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/users`,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  return {
    users,
    loading: !error && !users,
    error,
  };
}

// export function useDocumentLinks() {
//   const router = useRouter();
//   const teamInfo = useTeam();

//   const { id } = router.query as {
//     id: string;
//   };

//   const { data: links, error } = useSWR<LinkWithViews[]>(
//     teamInfo?.currentTeam?.id &&
//     id &&
//     `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(
//       id,
//     )}/links`,
//     fetcher,
//     {
//       dedupingInterval: 10000,
//     },
//   );

//   return {
//     links,
//     loading: !error && !links,
//     error,
//   };
// }

