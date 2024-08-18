import { useState } from "react";

import { TeamContextType } from "@/context/team-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadNotificationDrawer } from "@/components/upload-notification";
import UploadZone from "@/components/upload-zone";

import {
  DataroomFolderDocument,
  DataroomFolderWithCount,
} from "@/lib/swr/use-dataroom";
import { FolderWithCount } from "@/lib/swr/use-documents";
import { DocumentWithLinksAndLinkCountAndViewCount, OrganizationMembership, OrganizationUser, PeopleWithSkillsAndRoles } from "@/lib/types";

import DataroomDocumentCard from "../datarooms/dataroom-document-card";
import DocumentCard from "./people-card";
import { EmptyPeople } from "./empty-people";
import PersonCard from "./people-card";
import MembershipCard from "./member-card";

export function PeopleList({
  folders,
  people,
  teamInfo,
  folderPathName,
  dataroomId,
}: {
  folders: FolderWithCount[] | DataroomFolderWithCount[] | undefined;
  people: any[] | OrganizationMembership[] | undefined;
  teamInfo: TeamContextType | null;
  folderPathName?: string[];
  dataroomId?: string;
}) {
  const [uploads, setUploads] = useState<
    { fileName: string; progress: number; documentId?: string }[]
  >([]);
  const [rejectedFiles, setRejectedFiles] = useState<
    { fileName: string; message: string }[]
  >([]);

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <UploadZone
        folderPathName={folderPathName?.join("/")}
        onUploadStart={(newUploads) => {
          setUploads(newUploads);
          setShowDrawer(true);
        }}
        onUploadProgress={(index, progress, documentId) => {
          setUploads((prevUploads) =>
            prevUploads.map((upload, i) =>
              i === index ? { ...upload, progress, documentId } : upload,
            ),
          );
        }}
        onUploadRejected={(rejected) => {
          setRejectedFiles(rejected);
          setShowDrawer(true);
        }}
        setUploads={setUploads}
        setRejectedFiles={setRejectedFiles}
        dataroomId={dataroomId}
      >
        <ScrollArea
          className="-m-2 h-[calc(100dvh-205px)] *:p-2"
          showScrollbar={true}
        >
          <div className="space-y-4">

            {/* Documents list */}
            <ul role="list" className="space-y-4">
              {people
                ? people.map((person: OrganizationMembership) => {
                  return (
                    <MembershipCard
                      key={person.userId}
                      membership={
                        person as OrganizationMembership
                      }
                      teamInfo={teamInfo}
                    />
                  );
                })
                : Array.from({ length: 3 }).map((_, i) => (
                  <li
                    key={i}
                    className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                  >
                    <Skeleton key={i} className="h-9 w-9" />
                    <div>
                      <Skeleton key={i} className="h-4 w-32" />
                      <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                    </div>
                    <Skeleton
                      key={i + 1}
                      className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                    />
                  </li>
                ))}
            </ul>

            {people && people.length === 0 && (
              <div className="flex items-center justify-center">
                <EmptyPeople />
              </div>
            )}
          </div>
        </ScrollArea>
      </UploadZone>
      {showDrawer ? (
        <UploadNotificationDrawer
          open={showDrawer}
          onOpenChange={setShowDrawer}
          uploads={uploads}
          setUploads={setUploads}
          rejectedFiles={rejectedFiles}
          setRejectedFiles={setRejectedFiles}
        />
      ) : null}
    </>
  );
}
