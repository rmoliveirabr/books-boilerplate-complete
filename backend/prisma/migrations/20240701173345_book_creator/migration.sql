-- AlterTable
ALTER TABLE `book` ADD COLUMN `creatorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
