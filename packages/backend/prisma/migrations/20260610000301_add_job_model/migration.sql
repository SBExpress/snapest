/*
  Warnings:

  - You are about to drop the `AdditionalCost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Assembly` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AssemblyLineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estimate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstimateLineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isActive` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `isTemporary` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `Material` table. All the data in the column will be lost.
  - You are about to alter the column `basePrice` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel1Hours` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel2Hours` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel3Hours` on the `Material` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `applyOHPToAdditionalCosts` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `copyTakeoffCopyCloseoutSettings` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `copyTakeoffIncludeTemporaryItems` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `copyTakeoffPriceSource` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `miscMaterialEnabled` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `miscMaterialPercent` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfLaborLevels` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `showPerLineUnitPrice` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `showRunningFinalPrice` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `taxCalculationMode` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `unitPriceIncludesAdditionalCosts` on the `Settings` table. All the data in the column will be lost.
  - You are about to alter the column `laborBurdenPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel1Rate` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel2Rate` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborLevel3Rate` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborOverheadPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `laborProfitPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `materialOverheadPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `materialProfitPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `materialSalesTaxPercent` on the `Settings` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - Made the column `laborLevel1Hours` on table `Material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborLevel2Hours` on table `Material` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborLevel3Hours` on table `Material` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "AdditionalCost_estimateId_idx";

-- DropIndex
DROP INDEX "Assembly_isTemporary_idx";

-- DropIndex
DROP INDEX "Assembly_companyId_idx";

-- DropIndex
DROP INDEX "AssemblyLineItem_materialId_idx";

-- DropIndex
DROP INDEX "AssemblyLineItem_assemblyId_idx";

-- DropIndex
DROP INDEX "Estimate_estimateNumber_companyId_key";

-- DropIndex
DROP INDEX "Estimate_createdAt_idx";

-- DropIndex
DROP INDEX "Estimate_status_idx";

-- DropIndex
DROP INDEX "Estimate_companyId_idx";

-- DropIndex
DROP INDEX "EstimateLineItem_assemblyId_idx";

-- DropIndex
DROP INDEX "EstimateLineItem_materialId_idx";

-- DropIndex
DROP INDEX "EstimateLineItem_estimateId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdditionalCost";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Assembly";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AssemblyLineItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estimate";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EstimateLineItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "subscriptionTier" TEXT NOT NULL DEFAULT 'free',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("createdAt", "email", "id", "name", "status", "subscriptionTier", "updatedAt") SELECT "createdAt", "email", "id", "name", "status", "subscriptionTier", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
CREATE TABLE "new_Material" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "basePrice" REAL NOT NULL,
    "laborLevel1Hours" REAL NOT NULL,
    "laborLevel2Hours" REAL NOT NULL,
    "laborLevel3Hours" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Material_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Material" ("basePrice", "category", "companyId", "createdAt", "description", "id", "itemNumber", "laborLevel1Hours", "laborLevel2Hours", "laborLevel3Hours", "unit", "updatedAt") SELECT "basePrice", "category", "companyId", "createdAt", "description", "id", "itemNumber", "laborLevel1Hours", "laborLevel2Hours", "laborLevel3Hours", "unit", "updatedAt" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE INDEX "Material_companyId_idx" ON "Material"("companyId");
CREATE UNIQUE INDEX "Material_itemNumber_companyId_key" ON "Material"("itemNumber", "companyId");
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "laborLevel1Name" TEXT NOT NULL DEFAULT 'Apprentice',
    "laborLevel2Name" TEXT NOT NULL DEFAULT 'Journeyman',
    "laborLevel3Name" TEXT NOT NULL DEFAULT 'Foreman',
    "laborLevel1Rate" REAL NOT NULL DEFAULT 25.00,
    "laborLevel2Rate" REAL NOT NULL DEFAULT 45.00,
    "laborLevel3Rate" REAL NOT NULL DEFAULT 65.00,
    "laborBurdenPercent" REAL NOT NULL DEFAULT 30,
    "materialSalesTaxPercent" REAL NOT NULL DEFAULT 6.625,
    "materialOverheadPercent" REAL NOT NULL DEFAULT 15,
    "materialProfitPercent" REAL NOT NULL DEFAULT 12,
    "laborOverheadPercent" REAL NOT NULL DEFAULT 15,
    "laborProfitPercent" REAL NOT NULL DEFAULT 12,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Settings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Settings" ("companyId", "createdAt", "id", "laborBurdenPercent", "laborLevel1Name", "laborLevel1Rate", "laborLevel2Name", "laborLevel2Rate", "laborLevel3Name", "laborLevel3Rate", "laborOverheadPercent", "laborProfitPercent", "materialOverheadPercent", "materialProfitPercent", "materialSalesTaxPercent", "updatedAt") SELECT "companyId", "createdAt", "id", "laborBurdenPercent", "laborLevel1Name", "laborLevel1Rate", "laborLevel2Name", "laborLevel2Rate", "laborLevel3Name", "laborLevel3Rate", "laborOverheadPercent", "laborProfitPercent", "materialOverheadPercent", "materialProfitPercent", "materialSalesTaxPercent", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_companyId_key" ON "Settings"("companyId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "status" TEXT NOT NULL DEFAULT 'active',
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("companyId", "createdAt", "email", "id", "name", "password", "role", "status", "updatedAt") SELECT "companyId", "createdAt", "email", "id", "name", "password", "role", "status", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_companyId_key" ON "User"("email", "companyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");
