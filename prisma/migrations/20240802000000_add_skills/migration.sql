-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "teamId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkillTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTagSkill" (
    "skillId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "SkillTagSkill_pkey" PRIMARY KEY ("skillId","tagId")
);

-- CreateIndex
CREATE INDEX "Skill_teamId_idx" ON "Skill"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTag_name_key" ON "SkillTag"("name");

-- CreateIndex
CREATE INDEX "SkillTag_name_idx" ON "SkillTag"("name");

-- CreateIndex
CREATE INDEX "SkillTagSkill_tagId_idx" ON "SkillTagSkill"("tagId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTagSkill" ADD CONSTRAINT "SkillTagSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTagSkill" ADD CONSTRAINT "SkillTagSkill_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "SkillTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

