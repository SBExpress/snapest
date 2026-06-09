-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "subscriptionTier" TEXT NOT NULL DEFAULT 'starter',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'estimator',
    "status" TEXT NOT NULL DEFAULT 'active',
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "basePrice" DECIMAL NOT NULL,
    "laborLevel1Hours" DECIMAL,
    "laborLevel2Hours" DECIMAL,
    "laborLevel3Hours" DECIMAL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "supplier" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isTemporary" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Material_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Assembly" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'General',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isTemporary" BOOLEAN NOT NULL DEFAULT false,
    "totalCost" DECIMAL NOT NULL DEFAULT 0,
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assembly_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AssemblyLineItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assemblyId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "quantityFormula" TEXT,
    "quantityValue" DECIMAL NOT NULL,
    "laborLevel1Hours" DECIMAL,
    "laborLevel2Hours" DECIMAL,
    "laborLevel3Hours" DECIMAL,
    "lineTotal" DECIMAL NOT NULL DEFAULT 0,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AssemblyLineItem_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AssemblyLineItem_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estimateNumber" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "customerGC" TEXT NOT NULL,
    "address" TEXT,
    "scopeSummary" TEXT,
    "bidDueDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "notes" TEXT,
    "companyId" TEXT NOT NULL,
    "laborLevel1Rate" DECIMAL,
    "laborLevel2Rate" DECIMAL,
    "laborLevel3Rate" DECIMAL,
    "laborBurdenPercent" DECIMAL,
    "materialOverheadPercent" DECIMAL,
    "materialProfitPercent" DECIMAL,
    "laborOverheadPercent" DECIMAL,
    "laborProfitPercent" DECIMAL,
    "salesTaxPercent" DECIMAL,
    "taxCalculationMode" TEXT DEFAULT 'modeA',
    "totalMaterialCost" DECIMAL NOT NULL DEFAULT 0,
    "totalLaborCost" DECIMAL NOT NULL DEFAULT 0,
    "totalTax" DECIMAL NOT NULL DEFAULT 0,
    "totalAdditionalCosts" DECIMAL NOT NULL DEFAULT 0,
    "finalSellPrice" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Estimate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstimateLineItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "estimateId" TEXT NOT NULL,
    "materialId" TEXT,
    "assemblyId" TEXT,
    "quantityFormula" TEXT,
    "quantityValue" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "materialPricePerUnit" DECIMAL NOT NULL,
    "laborLevel1Hours" DECIMAL NOT NULL DEFAULT 0,
    "laborLevel2Hours" DECIMAL NOT NULL DEFAULT 0,
    "laborLevel3Hours" DECIMAL NOT NULL DEFAULT 0,
    "materialAdjustmentPercent" DECIMAL NOT NULL DEFAULT 0,
    "laborAdjustmentPercent" DECIMAL NOT NULL DEFAULT 0,
    "materialLineTotal" DECIMAL NOT NULL DEFAULT 0,
    "laborLineTotal" DECIMAL NOT NULL DEFAULT 0,
    "markup" DECIMAL NOT NULL DEFAULT 0,
    "sellingPrice" DECIMAL NOT NULL DEFAULT 0,
    "comment" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "isTemporary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EstimateLineItem_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "Estimate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EstimateLineItem_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EstimateLineItem_assemblyId_fkey" FOREIGN KEY ("assemblyId") REFERENCES "Assembly" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdditionalCost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "applyOHnP" BOOLEAN NOT NULL DEFAULT true,
    "estimateId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AdditionalCost_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "Estimate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "laborLevel1Name" TEXT NOT NULL DEFAULT 'Level 1',
    "laborLevel2Name" TEXT NOT NULL DEFAULT 'Level 2',
    "laborLevel3Name" TEXT NOT NULL DEFAULT 'Level 3',
    "laborLevel1Rate" DECIMAL NOT NULL DEFAULT 0,
    "laborLevel2Rate" DECIMAL NOT NULL DEFAULT 0,
    "laborLevel3Rate" DECIMAL NOT NULL DEFAULT 0,
    "laborBurdenPercent" DECIMAL NOT NULL DEFAULT 30,
    "numberOfLaborLevels" INTEGER NOT NULL DEFAULT 3,
    "materialSalesTaxPercent" DECIMAL NOT NULL DEFAULT 0,
    "taxCalculationMode" TEXT NOT NULL DEFAULT 'modeA',
    "materialOverheadPercent" DECIMAL NOT NULL DEFAULT 15,
    "materialProfitPercent" DECIMAL NOT NULL DEFAULT 12,
    "laborOverheadPercent" DECIMAL NOT NULL DEFAULT 15,
    "laborProfitPercent" DECIMAL NOT NULL DEFAULT 12,
    "applyOHPToAdditionalCosts" BOOLEAN NOT NULL DEFAULT true,
    "showPerLineUnitPrice" BOOLEAN NOT NULL DEFAULT false,
    "showRunningFinalPrice" BOOLEAN NOT NULL DEFAULT false,
    "unitPriceIncludesAdditionalCosts" BOOLEAN NOT NULL DEFAULT false,
    "miscMaterialPercent" DECIMAL NOT NULL DEFAULT 7,
    "miscMaterialEnabled" BOOLEAN NOT NULL DEFAULT false,
    "copyTakeoffPriceSource" TEXT NOT NULL DEFAULT 'live',
    "copyTakeoffIncludeTemporaryItems" BOOLEAN NOT NULL DEFAULT false,
    "copyTakeoffCopyCloseoutSettings" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Settings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE INDEX "Company_status_idx" ON "Company"("status");

-- CreateIndex
CREATE INDEX "User_companyId_idx" ON "User"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_companyId_key" ON "User"("email", "companyId");

-- CreateIndex
CREATE INDEX "Material_companyId_idx" ON "Material"("companyId");

-- CreateIndex
CREATE INDEX "Material_isTemporary_idx" ON "Material"("isTemporary");

-- CreateIndex
CREATE UNIQUE INDEX "Material_itemNumber_companyId_key" ON "Material"("itemNumber", "companyId");

-- CreateIndex
CREATE INDEX "Assembly_companyId_idx" ON "Assembly"("companyId");

-- CreateIndex
CREATE INDEX "Assembly_isTemporary_idx" ON "Assembly"("isTemporary");

-- CreateIndex
CREATE INDEX "AssemblyLineItem_assemblyId_idx" ON "AssemblyLineItem"("assemblyId");

-- CreateIndex
CREATE INDEX "AssemblyLineItem_materialId_idx" ON "AssemblyLineItem"("materialId");

-- CreateIndex
CREATE INDEX "Estimate_companyId_idx" ON "Estimate"("companyId");

-- CreateIndex
CREATE INDEX "Estimate_status_idx" ON "Estimate"("status");

-- CreateIndex
CREATE INDEX "Estimate_createdAt_idx" ON "Estimate"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Estimate_estimateNumber_companyId_key" ON "Estimate"("estimateNumber", "companyId");

-- CreateIndex
CREATE INDEX "EstimateLineItem_estimateId_idx" ON "EstimateLineItem"("estimateId");

-- CreateIndex
CREATE INDEX "EstimateLineItem_materialId_idx" ON "EstimateLineItem"("materialId");

-- CreateIndex
CREATE INDEX "EstimateLineItem_assemblyId_idx" ON "EstimateLineItem"("assemblyId");

-- CreateIndex
CREATE INDEX "AdditionalCost_estimateId_idx" ON "AdditionalCost"("estimateId");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_companyId_key" ON "Settings"("companyId");
