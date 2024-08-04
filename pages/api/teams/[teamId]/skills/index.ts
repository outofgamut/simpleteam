import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth/next";

import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { getTeamWithUsersAndDocument, getTeamWithUsersAndSkills } from "@/lib/team/helper";
import { CustomUser } from "@/lib/types";

import { authOptions } from "../../../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // GET /api/teams/:teamId/skills
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).end("Unauthorized");
    }

    const { teamId } = req.query as { teamId: string };

    const userId = (session.user as CustomUser).id;

    try {
      const { team } = await getTeamWithUsersAndSkills({
        teamId,
        userId,
        options: {
          // where: {
          //   folderId: null,
          // },
          orderBy: {
            createdAt: "desc",
          },
          // include: {
          //   _count: {
          //     select: { links: true, views: true, versions: true },
          //   },
          //   links: {
          //     take: 1,
          //     select: { id: true },
          //   },
          // },
        },
      });

      const skills = team.skills;

      return res.status(200).json(skills);
    } catch (error) {
      errorhandler(error, res);
    }
  } else if (req.method === "POST") {
    // POST /api/teams/:teamId/skills
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }

    const { teamId } = req.query as { teamId: string };

    const userId = (session.user as CustomUser).id;

    // Assuming data is an object with `name` and `description` properties
    const {
      name,
      description,
    } = req.body as {
      name: string;
      description?: string;
    };

    try {
      await getTeamWithUsersAndDocument({
        teamId,
        userId,
      });

      // Save data to the database
      const skill = await prisma.skill.create({
        data: {
          name: name,
          description: description,
          // ownerId: (session.user as CustomUser).id,
          teamId: teamId,
        },
      });

      return res.status(201).json(skill);
    } catch (error) {
      log({
        message: `Failed to create skill. \n\n*teamId*: _${teamId}_, \n\n ${error}`,
        type: "error",
      });
      errorhandler(error, res);
    }
  } else {
    // We only allow GET and POST requests
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
