import { Document, DocumentVersion, Domain, Link, Skill, View } from "@prisma/client";

import prisma from "@/lib/prisma";
import { decryptEncrpytedPassword } from "@/lib/utils";

import { DocumentError, TeamError } from "../errorHandler";

interface ITeamUserAndDocument {
  teamId: string;
  userId: string;
  docId?: string;
  checkOwner?: boolean;
  options?: {};
}

interface ITeamUserAndSkill {
  teamId: string;
  userId: string;
  skillId?: string;
  checkOwner?: boolean;
  options?: {};
}

interface ITeamWithDomain {
  teamId: string;
  userId: string;
  domain?: string;
  options?: {};
}

interface IDocumentWithLink {
  docId: string;
  userId: string;
  options?: {};
}

export async function getTeamWithUsersAndDocument({
  teamId,
  userId,
  docId,
  checkOwner,
  options,
}: ITeamUserAndDocument) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      users: {
        select: {
          userId: true,
        },
      },
      documents: {
        ...options,
      },
    },
  });

  // check if the team exists
  if (!team) {
    throw new TeamError("Team doesn't exists");
  }

  // check if the user is part of the team
  const teamHasUser = team?.users.some((user) => user.userId === userId);
  if (!teamHasUser) {
    throw new TeamError("You are not a member of the team");
  }

  // check if the document exists in the team
  let document:
    | (Document & {
      views?: View[];
      versions?: DocumentVersion[];
      links?: Link[];
    })
    | undefined;
  if (docId) {
    document = team.documents.find((doc) => doc.id === docId);
    if (!document) {
      throw new TeamError("Document doesn't exist in the team");
    }
  }
  if (document && document?.links) {
    document?.links?.forEach((res: Link) => {
      if (res?.password != null) {
        let decryptedPassword: string = decryptEncrpytedPassword(res?.password);
        res["password"] = decryptedPassword;
      }
    });
  }
  // Check that the user is owner of the document, otherwise return 401
  // if (checkOwner) {
  //   const isUserOwnerOfDocument = document?.ownerId === userId;
  //   if (!isUserOwnerOfDocument) {
  //     throw new TeamError("Unauthorized access to the document");
  //   }
  // }

  return { team, document };
}

// addd a function to get a team member (team = organization)
export async function getTeamMember({
  teamId,
  memberId,
}: {
  teamId: string;
  memberId: string;
}) {
  const teamMember = await prisma.organizationMembership.findFirst({
    where: {
      teamId,
      id: memberId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return { teamMember };
}

export async function getTeamWithUsersAndSkills({
  teamId,
  userId,
  skillId,
  checkOwner,
  options,
}: ITeamUserAndSkill) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      users: {
        select: {
          userId: true,
        },
      },
      skills: {
        ...options,
      },
    },
  });

  // check if the team exists
  if (!team) {
    throw new TeamError("Team doesn't exists");
  }

  // check if the user is part of the team
  const teamHasUser = team?.users.some((user) => user.userId === userId);
  if (!teamHasUser) {
    throw new TeamError("You are not a member of the team");
  }

  // check if the skill exists in the team
  let skill:
    | (Skill & {
      // views?: View[];
      // versions?: DocumentVersion[];
      // links?: Link[];
    })
    | undefined;
  if (skillId) {
    skill = team.skills.find((skill) => skill.id === skillId);
    if (!skill) {
      throw new TeamError("Skill doesn't exist in the team");
    }
  }

  // Check that the user is owner of the document, otherwise return 401
  // if (checkOwner) {
  //   const isUserOwnerOfDocument = document?.ownerId === userId;
  //   if (!isUserOwnerOfDocument) {
  //     throw new TeamError("Unauthorized access to the document");
  //   }
  // }

  return { team, skill };
}

export async function getTeamWithDomain({
  teamId,
  userId,
  domain: domainSlug,
  options,
}: ITeamWithDomain) {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      users: {
        select: {
          userId: true,
        },
      },
      domains: {
        ...options,
      },
    },
  });

  // check if the team exists
  if (!team) {
    throw new TeamError("Team doesn't exists");
  }

  // check if the user is part the team
  const teamHasUser = team?.users.some((user) => user.userId === userId);
  if (!teamHasUser) {
    throw new TeamError("You are not a member of the team");
  }

  // check if the domain exists in the team
  let domain: Domain | undefined;
  if (domainSlug) {
    domain = team.domains.find((_domain) => _domain.slug === domainSlug);
    if (!domain) {
      throw new TeamError("Domain doesn't exist in the team");
    }
  }

  return { team, domain };
}

export async function getDocumentWithTeamAndUser({
  docId,
  userId,
  options,
}: IDocumentWithLink) {
  const document = (await prisma.document.findUnique({
    where: {
      id: docId,
    },
    include: {
      ...options,
    },
  })) as Document & { team: { users: { userId: string }[] } };

  if (!document) {
    throw new DocumentError("Document doesn't exists");
  }

  const teamHasUser = document.team?.users.some(
    (user) => user.userId === userId,
  );
  if (!teamHasUser) {
    throw new TeamError("You are not a member of the team");
  }

  return { document };
}
