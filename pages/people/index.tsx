import { useMemo, useState } from "react";

import { useTeam } from "@/context/team-context";
import { FolderIcon, FolderPlusIcon, PlusIcon, SearchIcon, UsersIcon } from "lucide-react";

import { AddDocumentModal } from "@/components/documents/add-document-modal";
import { DocumentsList } from "@/components/documents/documents-list";
import { AddFolderModal } from "@/components/folders/add-folder-modal";
import AppLayout from "@/components/layouts/app";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useDocuments, { useRootFolders } from "@/lib/swr/use-documents";
import { PeopleList } from "@/components/people/people-list";
import { PeopleWithSkillsAndRoles } from "@/lib/types";
import { AddPersonModal } from "@/components/people/add-person-modal";
import useMemberships from "@/lib/swr/use-memberships";
import { useUsers } from "@/lib/swr/use-users";
import { searchPeople } from "@/lib/search/people";

export default function People() {
    const { users } = useUsers();
    const { memberships } = useMemberships();
    const { folders } = useRootFolders();
    const teamInfo = useTeam();
    const [query, setQuery] = useState("");

    const filteredPeople = useMemo(
        () => (memberships ? searchPeople(memberships, query) : undefined),
        [memberships, query],
    );

    // const people: PeopleWithSkillsAndRoles[] = [
    //     {
    //         id: "clzetg0ax000n12j3f09s3b0l",
    //         firstName: "John",
    //         lastName: "Doe",
    //         email: "johndoe@company.com",
    //         title: "Senior Associate",
    //         roles: ["Software Engineer", "Product Manager"],
    //         skills: ["React", "Node.js", "GraphQL"],
    //     },
    //     {
    //         id: "clzetdiou000l12j3yvwbb4rc",
    //         firstName: "Jane",
    //         lastName: "Doe",
    //         email: "",
    //         title: "Lead Associate",
    //         roles: ["Data Analyst", "Product Manager"],
    //         skills: ["React", "Node.js", "GraphQL"],
    //     },
    //     {
    //         id: "clzen3mxk000h12j3rp782c6i",
    //         firstName: "Alice",
    //         lastName: "Smith",
    //         email: "",
    //         title: "Senior Associate",
    //         roles: ["Software Engineer", "Product Manager"],
    //         skills: ["Java", "Node.js", "Angular"],
    //     }

    // ]

    return (
        <AppLayout>
            <main className="p-4 sm:mx-4 sm:mt-4">
                <section className="mb-4 flex items-center justify-between md:mb-8 lg:mb-12">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            All People
                        </h2>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            View your people and their skills and experiences.
                        </p>
                    </div>
                    {/* <div className="flex items-center justify-between gap-4"> */}
                    {/* <AddDocumentModal>
              <Button
                size="icon"
                className="fixed bottom-6 right-5 z-30 lg:hidden sm:bottom-0 sm:right-0 sm:relative w-10 sm:w-44 h-10 sm:h-10"
              >
                <span className="hidden sm:block">Add New Document</span>
                <span className="block sm:hidden">
                  <PlusIcon className="w-6 h-6" />
                </span>
              </Button>
            </AddDocumentModal> */}
                    <div className="flex items-center gap-x-2">
                        <AddPersonModal>
                            <Button
                                className="group flex flex-1 items-center justify-start gap-x-2 px-2 text-left"
                                title="Add Person"
                            >
                                <PlusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                                <span>Add Person</span>
                            </Button>
                        </AddPersonModal>
                    </div>
                    {/* </div> */}
                </section>

                <section className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="relative w-full sm:max-w-xs">
                        <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search people by name, email, or skill..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    {memberships && memberships.length > 0 ? (
                        <p className="flex items-center gap-x-2 text-sm text-gray-400">
                            <UsersIcon className="h-4 w-4" />
                            <span>
                                {query
                                    ? `${filteredPeople?.length ?? 0} of ${memberships.length} people`
                                    : `${memberships.length} people`}
                            </span>
                        </p>
                    ) : null}
                </section>

                <Separator className="mb-5 bg-gray-200 dark:bg-gray-800" />

                <PeopleList
                    people={filteredPeople}
                    folders={folders}
                    teamInfo={teamInfo}
                    searchQuery={query}
                />
            </main>
        </AppLayout>
    );
}
