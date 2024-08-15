import { useRouter } from "next/router";

import { useTeam } from "@/context/team-context";
import { View } from "@prisma/client";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import { DocumentWithVersion, LinkWithViews, SkillWithTags } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export function usePerson() {
  const router = useRouter();
  const teamInfo = useTeam();

  const { id } = router.query as {
    id: string;
  };

  const { data: person, error } = useSWR<SkillWithTags>(
    teamInfo?.currentTeam?.id &&
    id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/skills/${encodeURIComponent(
      id,
    )}`,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  return {
    person,
    loading: !error && !person,
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

interface ViewWithDuration extends View {
  internal: boolean;
  duration: {
    data: { pageNumber: string; sum_duration: number }[];
  };
  totalDuration: number;
  completionRate: number;
  link: {
    name: string | null;
  };
  feedbackResponse: {
    id: string;
    data: {
      question: string;
      answer: string;
    };
  } | null;
  agreementResponse: {
    id: string;
    agreementId: string;
    agreement: {
      name: string;
    };
  } | null;
}

type TStatsData = {
  hiddenViewCount: number;
  viewsWithDuration: ViewWithDuration[];
  totalViews: number;
};

export function useDocumentVisits(page: number, limit: number) {
  const router = useRouter();
  const teamInfo = useTeam();
  const teamId = teamInfo?.currentTeam?.id;

  const { id } = router.query as {
    id: string;
  };

  const cacheKey =
    teamId && id
      ? `/api/teams/${teamId}/documents/${id}/views?page=${page}&limit=${limit}`
      : null;

  const { data: views, error } = useSWR<TStatsData>(cacheKey, fetcher, {
    dedupingInterval: 20000,
    revalidateOnFocus: false,
  });

  return {
    views,
    loading: !error && !views,
    error,
  };
}

interface DocumentProcessingStatus {
  currentPageCount: number;
  totalPages: number;
  hasPages: boolean;
}

export function useDocumentProcessingStatus(documentVersionId: string) {
  const teamInfo = useTeam();
  const teamId = teamInfo?.currentTeam?.id;

  const { data: status, error } = useSWR<DocumentProcessingStatus>(
    teamId &&
    `/api/teams/${teamId}/documents/document-processing-status?documentVersionId=${documentVersionId}`,
    fetcher,
    {
      refreshInterval: 3000, // refresh every 3 seconds
    },
  );

  return {
    status: status,
    loading: !error && !status,
    error: error,
  };
}

export function useDocumentThumbnail(pageNumber: number, documentId: string) {
  const { data, error } = useSWR<{ imageUrl: string }>(
    pageNumber === 0
      ? null
      : `/api/jobs/get-thumbnail?documentId=${documentId}&pageNumber=${pageNumber}`,
    fetcher,
    {
      dedupingInterval: 1200000,
      revalidateOnFocus: false,
      // revalidateOnMount: false,
      revalidateIfStale: false,
      refreshInterval: 0,
    },
  );

  if (pageNumber === 0) {
    return {
      data: null,
      loading: false,
      error: null,
    };
  }

  return {
    data,
    loading: !error && !data,
    error,
  };
}
