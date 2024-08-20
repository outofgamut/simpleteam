import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      // Update the request status to APPROVED
      await prisma.earlyAccessRequest.update({
        where: { id: id as string },
        data: { status: "APPROVED" },
      });

      // Optionally, send an invitation email or allow the user to create an account
      // Example: Send an email invitation using a service like SendGrid

      res.status(200).json({ message: "Request approved" });
    } catch (error) {
      res.status(500).json({ message: "Error approving request" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}