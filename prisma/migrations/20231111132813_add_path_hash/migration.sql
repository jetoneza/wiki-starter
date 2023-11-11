-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "pathHash" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Page" ("content", "description", "id", "label", "path", "type") SELECT "content", "description", "id", "label", "path", "type" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
