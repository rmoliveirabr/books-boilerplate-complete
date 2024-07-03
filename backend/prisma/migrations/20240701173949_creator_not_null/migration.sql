/*
  Warnings:

  - Made the column `creatorId` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_creatorId_fkey`;

-- AlterTable
ALTER TABLE `book` MODIFY `creatorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
