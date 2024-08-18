-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- AlterTable
ALTER TABLE "OrganizationMembership" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profile" JSONB;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "preferences" JSONB;

-- CreateTable
CREATE TABLE "EarlyAccessRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarlyAccessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberSkill" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "context" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberExperience" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EarlyAccessRequest_email_key" ON "EarlyAccessRequest"("email");

-- CreateIndex
CREATE INDEX "MemberSkill_membershipId_idx" ON "MemberSkill"("membershipId");

-- CreateIndex
CREATE INDEX "MemberSkill_teamId_idx" ON "MemberSkill"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberSkill_membershipId_skillId_teamId_key" ON "MemberSkill"("membershipId", "skillId", "teamId");

-- CreateIndex
CREATE INDEX "MemberExperience_membershipId_idx" ON "MemberExperience"("membershipId");

-- CreateIndex
CREATE INDEX "MemberExperience_clientId_idx" ON "MemberExperience"("clientId");

-- CreateIndex
CREATE INDEX "MemberExperience_teamId_idx" ON "MemberExperience"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_domain_key" ON "Client"("domain");

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "OrganizationMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberSkill" ADD CONSTRAINT "MemberSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberExperience" ADD CONSTRAINT "MemberExperience_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberExperience" ADD CONSTRAINT "MemberExperience_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "OrganizationMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberExperience" ADD CONSTRAINT "MemberExperience_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

