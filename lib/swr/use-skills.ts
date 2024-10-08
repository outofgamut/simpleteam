import { useTeam } from "@/context/team-context";
import { Folder } from "@prisma/client";
import useSWR from "swr";

import { DocumentWithLinksAndLinkCountAndViewCount, SkillWithTags } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default function useSkills() {
  const teamInfo = useTeam();

  const { data: skills, error } = useSWR<
    SkillWithTags[]
  >(
    teamInfo?.currentTeam?.id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/skills`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    skills,
    loading: !skills && !error,
    error,
  };
}

export function useFolderDocuments({ name }: { name: string[] }) {
  const teamInfo = useTeam();

  const { data: documents, error } = useSWR<
    DocumentWithLinksAndLinkCountAndViewCount[]
  >(
    teamInfo?.currentTeam?.id &&
    name &&
    `/api/teams/${teamInfo?.currentTeam?.id}/folders/documents/${name.join("/")}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    documents,
    loading: !documents && !error,
    error,
  };
}

export type FolderWithCount = Folder & {
  _count: {
    documents: number;
    childFolders: number;
  };
};

export type FolderWithDocuments = Folder & {
  childFolders: FolderWithDocuments[];
  documents: {
    id: string;
    name: string;
    folderId: string;
  }[];
};

export function useFolders() {
  const teamInfo = useTeam();

  const { data: folders, error } = useSWR<FolderWithDocuments[]>(
    teamInfo?.currentTeam?.id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/folders`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    folders,
    loading: !folders && !error,
    error,
  };
}

export function useRootFolders() {
  const teamInfo = useTeam();

  const { data: folders, error } = useSWR<FolderWithCount[]>(
    teamInfo?.currentTeam?.id &&
    `/api/teams/${teamInfo?.currentTeam?.id}/folders?root=true`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    folders,
    loading: !folders && !error,
    error,
  };
}
