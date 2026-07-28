import { OrganizationMembership } from "@/lib/types";

// Single seam for people search. To adopt a search provider (Algolia,
// fuse.js, a server-side ?q= endpoint, ...) later, replace this function's
// body — callers only depend on (people, query) => people.
export function searchPeople(
    people: OrganizationMembership[],
    query: string,
): OrganizationMembership[] {
    const q = query.trim().toLowerCase();
    if (!q) return people;

    return people.filter((person) => {
        const haystack = [
            person.name,
            person.user?.name,
            person.user?.email,
            ...(person.skills?.map((memberSkill) => memberSkill.skill.name) ?? []),
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return haystack.includes(q);
    });
}
