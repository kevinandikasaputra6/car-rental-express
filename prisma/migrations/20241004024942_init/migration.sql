-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "manufacture" VARCHAR,
    "type" VARCHAR,
    "license_number" VARCHAR(30),
    "seat" INTEGER,
    "baggage" INTEGER,
    "transmision" VARCHAR,
    "year" DATE,
    "name" VARCHAR,
    "description" TEXT,
    "is_driver" BOOLEAN,
    "is_available" BOOLEAN DEFAULT true,
    "img" TEXT,
    "price" INTEGER,
    "create_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(6),
    "create_by" VARCHAR,
    "update_at" VARCHAR,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" BIGSERIAL NOT NULL,
    "order_no" VARCHAR NOT NULL,
    "cars_id" BIGINT NOT NULL,
    "users_id" BIGINT NOT NULL,
    "start_time" TIMESTAMP(6),
    "finish_time" TIMESTAMP(6),
    "total" DOUBLE PRECISION,
    "is_driver" BOOLEAN,
    "is_expired" BOOLEAN,
    "status" VARCHAR,
    "is_deleted" BOOLEAN,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "fullname" VARCHAR NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "address" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,
    "avatar" TEXT,
    "gender" VARCHAR,
    "phone_number" VARCHAR NOT NULL,
    "driver_license" TEXT NOT NULL,
    "birth_date" DATE,
    "create_dt" TIMESTAMP(6),
    "update_dt" TIMESTAMP(6),
    "create_by" VARCHAR,
    "update_at" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "car_name_index" ON "cars"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_no_key" ON "orders"("order_no");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cars_id_fkey" FOREIGN KEY ("cars_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
