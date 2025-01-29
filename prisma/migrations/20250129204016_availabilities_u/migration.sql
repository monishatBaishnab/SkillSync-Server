/*
  Warnings:

  - The values [NOT_AVAILABLE] on the enum `AVAILABILITY_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `day` on the `availabilities` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AVAILABILITY_STATUS_new" AS ENUM ('AVAILABLE', 'BOOKED');
ALTER TABLE "availabilities" ALTER COLUMN "status" TYPE "AVAILABILITY_STATUS_new" USING ("status"::text::"AVAILABILITY_STATUS_new");
ALTER TYPE "AVAILABILITY_STATUS" RENAME TO "AVAILABILITY_STATUS_old";
ALTER TYPE "AVAILABILITY_STATUS_new" RENAME TO "AVAILABILITY_STATUS";
DROP TYPE "AVAILABILITY_STATUS_old";
COMMIT;

-- AlterTable
ALTER TABLE "availabilities" DROP COLUMN "day";

-- DropEnum
DROP TYPE "WEEKDAYS";
