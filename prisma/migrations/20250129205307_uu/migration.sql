/*
  Warnings:

  - Added the required column `skill_id` to the `availabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "availabilities" ADD COLUMN     "skill_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
