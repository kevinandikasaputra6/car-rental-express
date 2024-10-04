-- AlterTable
ALTER TABLE "cars" ALTER COLUMN "update_dt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "create_by" VARCHAR,
ADD COLUMN     "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" VARCHAR,
ADD COLUMN     "update_dt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "create_dt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "update_dt" SET DATA TYPE TIMESTAMP(3);
