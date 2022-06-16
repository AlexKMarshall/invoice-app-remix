-- CreateTable
CREATE TABLE "Invoice" (
    "internalId" TEXT NOT NULL PRIMARY KEY,
    "id" TEXT NOT NULL,
    "due" DATETIME NOT NULL,
    "customerName" TEXT NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_key" ON "Invoice"("id");
