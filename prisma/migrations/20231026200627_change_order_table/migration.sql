/*
  Warnings:

  - You are about to drop the column `item` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "item",
DROP COLUMN "quantity",
ADD COLUMN     "itemId" TEXT NOT NULL;
