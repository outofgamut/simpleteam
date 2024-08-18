import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { CustomUser, OrganizationMembership } from "@/lib/types";
import { log } from "@/lib/utils";
import { getTeamWithUsersAndDocument } from "@/lib/team/helper";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        // GET /api/teams/:teamId/memberships
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).end("Unauthorized");
        }

        const { teamId } = req.query as { teamId: string };

        try {
            // check if currentUser is part of the team with the teamId
            const userTeam = await prisma.userTeam.findFirst({
                where: {
                    teamId,
                    userId: (session.user as CustomUser).id,
                },
            });

            if (!userTeam) {
                return res.status(403).json("You are not part of this team");
            }

            // get current members for the team
            const members = await prisma.organizationMembership.findMany({
                where: {
                    teamId: teamId,
                },
            });

            if (!members) {
                return res.status(404).json("No members found for this team");
            }

            res.status(200).json(members);
            return;
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
            const membership = await prisma.organizationMembership.create({
                data: {
                    // description: description,
                    // ownerId: (session.user as CustomUser).id,
                    teamId: teamId,
                    name: name,
                },
            });

            return res.status(201).json(membership);
        } catch (error) {
            log({
                message: `Failed to create membership. \n\n*teamId*: _${teamId}_, \n\n ${error}`,
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
