/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "UserEmailVerification" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEmailVerification_token_key" ON "UserEmailVerification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmailVerification_userId_key" ON "UserEmailVerification"("userId");

-- AddForeignKey
ALTER TABLE "UserEmailVerification" ADD CONSTRAINT "UserEmailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
