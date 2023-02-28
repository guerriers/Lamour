/*
 Navicat Premium Data Transfer

 Source Server         : xxxxx
 Source Server Type    : PostgreSQL
 Source Server Version : 140002
 Source Host           : localhost:5432
 Source Catalog        : Lamourcondo
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140002
 File Encoding         : 65001

 Date: 02/05/2022 23:21:27
*/


-- ----------------------------
-- Sequence structure for Payments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Payments_id_seq";
CREATE SEQUENCE "public"."Payments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Payments_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for Residents_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Residents_id_seq";
CREATE SEQUENCE "public"."Residents_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Residents_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for Services_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Services_id_seq";
CREATE SEQUENCE "public"."Services_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Services_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for Users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Users_id_seq";
CREATE SEQUENCE "public"."Users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."Users_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for roomRegistrations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."roomRegistrations_id_seq";
CREATE SEQUENCE "public"."roomRegistrations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."roomRegistrations_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for Payments
-- ----------------------------
DROP TABLE IF EXISTS "public"."Payments";
CREATE TABLE "public"."Payments" (
  "id" int4 NOT NULL DEFAULT nextval('"Payments_id_seq"'::regclass),
  "bill_id" int4,
  "proof_of_payment" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."Payments" OWNER TO "postgres";

-- ----------------------------
-- Table structure for Residents
-- ----------------------------
DROP TABLE IF EXISTS "public"."Residents";
CREATE TABLE "public"."Residents" (
  "id" int4 NOT NULL DEFAULT nextval('"Residents_id_seq"'::regclass),
  "room_id" int4,
  "floor" varchar(255) COLLATE "pg_catalog"."default",
  "size" varchar(255) COLLATE "pg_catalog"."default",
  "direction" varchar(255) COLLATE "pg_catalog"."default",
  "firstname" varchar(255) COLLATE "pg_catalog"."default",
  "lastname" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "car_registration" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "date" date,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."Residents" OWNER TO "postgres";

-- ----------------------------
-- Records of Residents
-- ----------------------------
BEGIN;
INSERT INTO "public"."Residents" VALUES (4, 202, 'ชั้น 2', '30.5 ตร.ม.', 'ทิศใต้', 'ธนโชค', 'รัตนโมรา', '0671296578', 'กง2255', '202', '0671296578', '2022-04-16', '2022-05-02 18:56:15.837+07', '2022-05-02 23:06:40.766+07');
INSERT INTO "public"."Residents" VALUES (7, 401, 'ชั้น 4', '29.5 ตร.ม.', 'ทิศเหนือ', 'จีฮาน', 'ดูเบ', '0669596893', 'กง6545', '401', '0669596893', '2022-05-01', '2022-05-02 18:57:02.07+07', '2022-05-02 18:57:02.07+07');
INSERT INTO "public"."Residents" VALUES (8, 402, 'ชั้น 4', '30.5 ตร.ม.', 'ทิศใต้', 'ธีรกิตติ์', 'ดีละ', '0636290363', '-', '402', '0636290363', '2022-03-31', '2022-05-02 18:57:53.377+07', '2022-05-02 18:57:53.377+07');
INSERT INTO "public"."Residents" VALUES (9, 501, 'ชั้น 5', '29.5 ตร.ม.', 'ทิศเหนือ', 'ธนา', 'ประเสริฐถา', '0653566482', '-', '501', '0653566482', '2022-04-07', '2022-05-02 18:58:40.307+07', '2022-05-02 18:58:40.307+07');
INSERT INTO "public"."Residents" VALUES (14, 702, 'ชั้น 7', '30.5 ตร.ม.', 'ทิศเหนือ', 'ปวเรศ', 'อิ่มยิ้ม', '0684053866', '-', '702', '0684053861', '2022-02-17', '2022-05-02 18:52:16.399+07', '2022-05-02 19:24:02.041+07');
INSERT INTO "public"."Residents" VALUES (15, 703, 'ชั้น 7', '33.5 ตร.ม.', 'ทิศใต้', 'ภาคภูมิ', 'ศรีอนุตร', '0693296658', 'กก5545', '703', '0693296658', '2022-04-25', '2022-05-02 18:53:25.617+07', '2022-05-02 18:59:23.584+07');
INSERT INTO "public"."Residents" VALUES (16, 704, 'ชั้น 7', '42 ตร.ม.', 'ทิศเหนือ', 'พรหมธรรศ', 'พรนิรัชธีรกุล', '0614394638', 'งง2436', '704', '0614394638', '2022-04-22', '2022-05-02 18:54:37.416+07', '2022-05-02 18:59:38.708+07');
INSERT INTO "public"."Residents" VALUES (17, 705, 'ชั้น 7', '29.5 ตร.ม.', 'ทิศใต้', 'วัชระ', 'ใฝ่ใจ', '0652831704', 'หพ2645', '705', '1234', '2022-03-20', '2022-05-02 18:55:33.635+07', '2022-05-02 19:06:14.913+07');
COMMIT;

-- ----------------------------
-- Table structure for Services
-- ----------------------------
DROP TABLE IF EXISTS "public"."Services";
CREATE TABLE "public"."Services" (
  "id" int4 NOT NULL DEFAULT nextval('"Services_id_seq"'::regclass),
  "room_id" int4,
  "electricity_bill" int4,
  "water_bill" int4,
  "common_fee" int4,
  "total_bill" int4,
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."Services" OWNER TO "postgres";

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "public"."Users";
CREATE TABLE "public"."Users" (
  "id" int4 NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."Users" OWNER TO "postgres";

-- ----------------------------
-- Records of Users
-- ----------------------------
BEGIN;
INSERT INTO "public"."Users" VALUES (1, 'admin', 'admin', '"1"', '2565-05-02 04:04:50+07', '2022-05-02 18:58:51.692+07');
INSERT INTO "public"."Users" VALUES (4, '202', '0671296578', '0', '2022-05-02 18:57:02.073+07', '2022-05-02 19:06:14.919+07');
INSERT INTO "public"."Users" VALUES (7, '401', '0669596893', '0', '2022-05-02 18:56:15.843+07', '2022-05-02 19:02:24.342+07');
INSERT INTO "public"."Users" VALUES (8, '402', '0636290363', '0', '2022-05-02 18:53:25.624+07', '2022-05-02 18:59:23.591+07');
INSERT INTO "public"."Users" VALUES (9, '501', '0653566482', '0', '2022-05-02 18:54:37.423+07', '2022-05-02 18:59:38.715+07');
INSERT INTO "public"."Users" VALUES (14, '702', '0684053866', '0', '2022-05-02 18:57:53.382+07', '2022-05-02 18:57:53.382+07');
INSERT INTO "public"."Users" VALUES (15, '703', '0693296658', '0', '2022-05-02 18:58:40.312+07', '2022-05-02 19:24:02.065+07');
INSERT INTO "public"."Users" VALUES (16, '704', '0614394638', '0', '2022-05-02 18:58:40.312+07', '2022-05-02 19:24:02.065+07');
INSERT INTO "public"."Users" VALUES (17, '705', '1234', '0', '2022-05-02 18:58:40.312+07', '2022-05-02 19:24:02.065+07');
COMMIT;

-- ----------------------------
-- Table structure for roomRegistrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."roomRegistrations";
CREATE TABLE "public"."roomRegistrations" (
  "id" int4 NOT NULL DEFAULT nextval('"roomRegistrations_id_seq"'::regclass),
  "room_id" int4,
  "floor" varchar(255) COLLATE "pg_catalog"."default",
  "size" varchar(255) COLLATE "pg_catalog"."default",
  "direction" varchar(255) COLLATE "pg_catalog"."default",
  "price" int4,
  "detail" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "date" date,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."roomRegistrations" OWNER TO "postgres";

-- ----------------------------
-- Records of roomRegistrations
-- ----------------------------
BEGIN;
INSERT INTO "public"."roomRegistrations" VALUES (1, 101, 'ชั้น 1', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '1', '2022-05-02', '2022-05-02 04:16:55.482+07', '2022-05-02 23:14:07.691+07');
INSERT INTO "public"."roomRegistrations" VALUES (2, 102, 'ชั้น 1', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '1', '2022-05-02', '2022-05-02 04:17:14.989+07', '2022-05-02 04:17:14.989+07');
INSERT INTO "public"."roomRegistrations" VALUES (4, 202, 'ชั้น 2', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '0', '2022-05-02', '2022-05-02 04:17:53.204+07', '2022-05-02 19:00:03.736+07');
INSERT INTO "public"."roomRegistrations" VALUES (5, 301, 'ชั้น 3', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '1', '2022-05-02', '2022-05-02 04:18:14.248+07', '2022-05-02 04:18:14.248+07');
INSERT INTO "public"."roomRegistrations" VALUES (6, 302, 'ชั้น 3', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '1', '2022-05-02', '2022-05-02 04:18:25.877+07', '2022-05-02 04:18:25.877+07');
INSERT INTO "public"."roomRegistrations" VALUES (7, 401, 'ชั้น 4', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '0', '2022-05-02', '2022-05-02 04:18:40.373+07', '2022-05-02 19:00:09.015+07');
INSERT INTO "public"."roomRegistrations" VALUES (8, 402, 'ชั้น 4', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '0', '2022-05-02', '2022-05-02 04:18:51.04+07', '2022-05-02 19:00:15.798+07');
INSERT INTO "public"."roomRegistrations" VALUES (9, 501, 'ชั้น 5', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '0', '2022-05-02', '2022-05-02 04:19:02.074+07', '2022-05-02 19:00:22.157+07');
INSERT INTO "public"."roomRegistrations" VALUES (10, 502, 'ชั้น 5', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '1', '2022-05-02', '2022-05-02 04:19:16.993+07', '2022-05-02 04:19:16.993+07');
INSERT INTO "public"."roomRegistrations" VALUES (11, 601, 'ชั้น 6', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '1', '2022-05-02', '2022-05-02 04:19:28.158+07', '2022-05-02 04:19:28.158+07');
INSERT INTO "public"."roomRegistrations" VALUES (12, 602, 'ชั้น 6', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '1', '2022-05-02', '2022-05-02 04:19:37.65+07', '2022-05-02 04:19:37.65+07');
INSERT INTO "public"."roomRegistrations" VALUES (13, 701, 'ชั้น 7', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '1', '2022-05-02', '2022-05-02 04:19:51.524+07', '2022-05-02 04:19:51.524+07');
INSERT INTO "public"."roomRegistrations" VALUES (14, 702, 'ชั้น 7', '30.5 ตร.ม.', 'ทิศใต้', 0, '-', '0', '2022-05-02', '2022-05-02 04:20:02.787+07', '2022-05-02 19:00:34.685+07');
INSERT INTO "public"."roomRegistrations" VALUES (15, 703, 'ชั้น 7', '33.5 ตร.ม.', 'ทิศตะวันออก', 0, '-', '0', '2022-05-02', '2022-05-02 04:20:19.627+07', '2022-05-02 19:00:38.377+07');
INSERT INTO "public"."roomRegistrations" VALUES (16, 704, 'ชั้น 7', '42 ตร.ม.', 'ทิศตะวันตก', 0, '-', '0', '2022-05-02', '2022-05-02 04:20:32.612+07', '2022-05-02 19:00:45.15+07');
INSERT INTO "public"."roomRegistrations" VALUES (17, 705, 'ชั้น 7', '29.5 ตร.ม.', 'ทิศเหนือ', 0, '-', '0', '2022-05-02', '2022-05-02 19:02:53.706+07', '2022-05-02 19:02:53.706+07');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Payments_id_seq"
OWNED BY "public"."Payments"."id";
SELECT setval('"public"."Payments_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Residents_id_seq"
OWNED BY "public"."Residents"."id";
SELECT setval('"public"."Residents_id_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Services_id_seq"
OWNED BY "public"."Services"."id";
SELECT setval('"public"."Services_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Users_id_seq"
OWNED BY "public"."Users"."id";
SELECT setval('"public"."Users_id_seq"', 12, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."roomRegistrations_id_seq"
OWNED BY "public"."roomRegistrations"."id";
SELECT setval('"public"."roomRegistrations_id_seq"', 18, true);

-- ----------------------------
-- Primary Key structure for table Payments
-- ----------------------------
ALTER TABLE "public"."Payments" ADD CONSTRAINT "Payments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Residents
-- ----------------------------
ALTER TABLE "public"."Residents" ADD CONSTRAINT "Residents_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Services
-- ----------------------------
ALTER TABLE "public"."Services" ADD CONSTRAINT "Services_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table roomRegistrations
-- ----------------------------
ALTER TABLE "public"."roomRegistrations" ADD CONSTRAINT "roomRegistrations_pkey" PRIMARY KEY ("id");
