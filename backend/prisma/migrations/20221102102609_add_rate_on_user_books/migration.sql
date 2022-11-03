/*
  Warnings:

  - Added the required column `rate` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserBook` ADD COLUMN `rate` INTEGER UNSIGNED NOT NULL;
