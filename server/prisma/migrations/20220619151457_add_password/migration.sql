/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `task_ibfk_1`;

-- AlterTable
ALTER TABLE `Task` MODIFY `userId` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
