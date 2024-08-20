import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, EarlyAccessRequest } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email } = req.body;

        try {
            // Check if the request already exists
            const existingRequest = await prisma.earlyAccessRequest.findUnique({
                where: { email },
            });

            if (existingRequest) {
                res.status(204).json({ message: "Request already submitted" });
            } else {
                // Create a new Early Access Request
                await prisma.earlyAccessRequest.create({
                    data: { email },
                });
                res.status(200).json({ message: "Request submitted" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error submitting request" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}