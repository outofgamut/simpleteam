import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { CustomUser, OrganizationMembership } from "@/lib/types";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        // GET /api/teams/:teamId/users
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
            const users = await prisma.userTeam.findMany({
                where: {
                    teamId: teamId,
                },
                include: {
                    user: true,
                },
            });

            if (!users) {
                return res.status(404).json("No members found for this team");
            }

            res.status(200).json(users);
            return;
        } catch (error) {
            errorhandler(error, res);
        }
    } else if (req.method === "DELETE") {
        // DELETE /api/teams/:teamId/users
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).end("Unauthorized");
        }

        const { teamId } = req.query as { teamId: string };

        const { id } = req.body as { id: string };

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

            // delete organization membership
            await prisma.organizationMembership.delete({
                where: {
                    id: id,
                }
            });

            res.status(204).end();
            return;
        } catch (error) {
            errorhandler(error, res);
        }
    }
}
