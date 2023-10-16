/*
  Warnings:

  - Added the required column `userMail` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "userMail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userMail_fkey" FOREIGN KEY ("userMail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
