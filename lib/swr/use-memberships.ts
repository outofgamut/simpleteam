import { useTeam } from "@/context/team-context";
import useSWR from "swr";

import { OrganizationMembership } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default function useMemberships() {
  const teamInfo = useTeam();

  const { data: memberships, error } = useSWR<
    OrganizationMembership[]
  >(
    teamInfo?.currentTeam?.id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/memberships`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    memberships,
    loading: !memberships && !error,
    error,
  };
}

