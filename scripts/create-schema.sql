-- ============================================================
-- HOTEL QUINTA VISTA VERDE — Payload CMS 3.x schema
-- Generated from collection/global definitions
-- Run this in Neon SQL Editor (all at once)
-- ============================================================

-- ENUMS (must come before tables that use them)
CREATE TYPE "public"."enum_rooms_type" AS ENUM('single','double','suite','family','junior-suite');
CREATE TYPE "public"."enum_gallery_category" AS ENUM('habitaciones','jardines','instalaciones','desayunos','volcan');
CREATE TYPE "public"."enum_experiences_category" AS ENUM('tour','lugar','actividad','recomendacion');
CREATE TYPE "public"."enum_reviews_platform" AS ENUM('booking','google','tripadvisor','airbnb','directo');

-- ----------------------------------------------------------------
-- USERS (auth collection)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "users" (
  "id"                           serial PRIMARY KEY,
  "name"                         varchar,
  "updated_at"                   timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"                   timestamp(3) with time zone DEFAULT now() NOT NULL,
  "email"                        varchar NOT NULL,
  "reset_password_token"         varchar,
  "reset_password_expiration"    timestamp(3) with time zone,
  "salt"                         varchar,
  "hash"                         varchar,
  "login_attempts"               numeric DEFAULT 0,
  "lock_until"                   timestamp(3) with time zone
);
CREATE INDEX  IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx"      ON "users" ("email");

-- Auth sessions (Payload 3.x stores sessions in DB)
-- NOTE: id is uuid (not serial) — Payload generates UUIDs for session ids
CREATE TABLE IF NOT EXISTS "users_sessions" (
  "id"          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "_order"      integer NOT NULL,
  "_parent_id"  integer NOT NULL,
  "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
  "expires_at"  timestamp(3) with time zone NOT NULL
);
CREATE INDEX IF NOT EXISTS "users_sessions_order_idx"     ON "users_sessions" ("_order");
CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
ALTER TABLE "users_sessions"
  ADD CONSTRAINT "users_sessions_parent_id_users_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- MEDIA (upload collection with 3 image sizes)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "media" (
  "id"                       serial PRIMARY KEY,
  "alt"                      varchar NOT NULL,
  "updated_at"               timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"               timestamp(3) with time zone DEFAULT now() NOT NULL,
  "url"                      varchar,
  "thumbnail_u_r_l"          varchar,
  "filename"                 varchar,
  "mime_type"                varchar,
  "filesize"                 numeric,
  "width"                    numeric,
  "height"                   numeric,
  "focal_x"                  numeric,
  "focal_y"                  numeric,
  "sizes_thumbnail_url"      varchar,
  "sizes_thumbnail_width"    numeric,
  "sizes_thumbnail_height"   numeric,
  "sizes_thumbnail_mime_type" varchar,
  "sizes_thumbnail_filesize" numeric,
  "sizes_thumbnail_filename" varchar,
  "sizes_card_url"           varchar,
  "sizes_card_width"         numeric,
  "sizes_card_height"        numeric,
  "sizes_card_mime_type"     varchar,
  "sizes_card_filesize"      numeric,
  "sizes_card_filename"      varchar,
  "sizes_hero_url"           varchar,
  "sizes_hero_width"         numeric,
  "sizes_hero_height"        numeric,
  "sizes_hero_mime_type"     varchar,
  "sizes_hero_filesize"      numeric,
  "sizes_hero_filename"      varchar
);
CREATE INDEX  IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx"    ON "media" ("filename");

-- ----------------------------------------------------------------
-- ROOMS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "rooms" (
  "id"          serial PRIMARY KEY,
  "name"        varchar NOT NULL,
  "type"        "enum_rooms_type",
  "description" varchar NOT NULL,
  "capacity"    numeric DEFAULT 2,
  "featured"    boolean DEFAULT false,
  "order"       numeric DEFAULT 0,
  "updated_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "rooms_created_at_idx" ON "rooms" ("created_at");

-- rooms.images (array field)
CREATE TABLE IF NOT EXISTS "rooms_images" (
  "id"         varchar PRIMARY KEY,
  "_order"     integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id"   integer NOT NULL
);
CREATE INDEX IF NOT EXISTS "rooms_images_order_idx"     ON "rooms_images" ("_order");
CREATE INDEX IF NOT EXISTS "rooms_images_parent_id_idx" ON "rooms_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "rooms_images_image_idx"     ON "rooms_images" ("image_id");
ALTER TABLE "rooms_images"
  ADD CONSTRAINT "rooms_images_image_id_media_id_fk"
  FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "rooms_images"
  ADD CONSTRAINT "rooms_images_parent_id_rooms_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- rooms.amenities (array field)
CREATE TABLE IF NOT EXISTS "rooms_amenities" (
  "id"         varchar PRIMARY KEY,
  "_order"     integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "amenity"    varchar
);
CREATE INDEX IF NOT EXISTS "rooms_amenities_order_idx"     ON "rooms_amenities" ("_order");
CREATE INDEX IF NOT EXISTS "rooms_amenities_parent_id_idx" ON "rooms_amenities" ("_parent_id");
ALTER TABLE "rooms_amenities"
  ADD CONSTRAINT "rooms_amenities_parent_id_rooms_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- BREAKFASTS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "breakfasts" (
  "id"          serial PRIMARY KEY,
  "name"        varchar NOT NULL,
  "description" varchar NOT NULL,
  "image_id"    integer NOT NULL,
  "featured"    boolean DEFAULT false,
  "order"       numeric DEFAULT 0,
  "updated_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "breakfasts_image_idx"      ON "breakfasts" ("image_id");
CREATE INDEX IF NOT EXISTS "breakfasts_created_at_idx" ON "breakfasts" ("created_at");
ALTER TABLE "breakfasts"
  ADD CONSTRAINT "breakfasts_image_id_media_id_fk"
  FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- breakfasts.mainIngredients (array field)
CREATE TABLE IF NOT EXISTS "breakfasts_main_ingredients" (
  "id"          varchar PRIMARY KEY,
  "_order"      integer NOT NULL,
  "_parent_id"  integer NOT NULL,
  "ingredient"  varchar
);
CREATE INDEX IF NOT EXISTS "breakfasts_main_ingredients_order_idx"     ON "breakfasts_main_ingredients" ("_order");
CREATE INDEX IF NOT EXISTS "breakfasts_main_ingredients_parent_id_idx" ON "breakfasts_main_ingredients" ("_parent_id");
ALTER TABLE "breakfasts_main_ingredients"
  ADD CONSTRAINT "breakfasts_main_ingredients_parent_id_breakfasts_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "breakfasts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- GALLERY
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "gallery" (
  "id"         serial PRIMARY KEY,
  "title"      varchar NOT NULL,
  "image_id"   integer NOT NULL,
  "category"   "enum_gallery_category" NOT NULL,
  "order"      numeric DEFAULT 0,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "gallery_image_idx"      ON "gallery" ("image_id");
CREATE INDEX IF NOT EXISTS "gallery_created_at_idx" ON "gallery" ("created_at");
ALTER TABLE "gallery"
  ADD CONSTRAINT "gallery_image_id_media_id_fk"
  FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- EXPERIENCES
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "experiences" (
  "id"          serial PRIMARY KEY,
  "name"        varchar NOT NULL,
  "description" varchar NOT NULL,
  "category"    "enum_experiences_category",
  "image_id"    integer,
  "duration"    varchar,
  "distance"    varchar,
  "order"       numeric DEFAULT 0,
  "updated_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "experiences_image_idx"      ON "experiences" ("image_id");
CREATE INDEX IF NOT EXISTS "experiences_created_at_idx" ON "experiences" ("created_at");
ALTER TABLE "experiences"
  ADD CONSTRAINT "experiences_image_id_media_id_fk"
  FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- REVIEWS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "reviews" (
  "id"         serial PRIMARY KEY,
  "author"     varchar NOT NULL,
  "location"   varchar,
  "rating"     numeric DEFAULT 5,
  "comment"    varchar NOT NULL,
  "platform"   "enum_reviews_platform",
  "date"       timestamp(3) with time zone,
  "featured"   boolean DEFAULT false,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "reviews_created_at_idx" ON "reviews" ("created_at");

-- ----------------------------------------------------------------
-- SITE_SETTINGS (global: site-settings)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "site_settings" (
  "id"               serial PRIMARY KEY,
  "whatsapp_number"  varchar NOT NULL,
  "phone"            varchar,
  "instagram"        varchar,
  "facebook"         varchar,
  "address"          varchar,
  "google_maps_url"  varchar,
  "waze_url"         varchar,
  "map_embed_url"    varchar,
  "booking_score"    varchar,
  "updated_at"       timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"       timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- ----------------------------------------------------------------
-- HERO_CONTENT (global: hero-content)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "hero_content" (
  "id"                    serial PRIMARY KEY,
  "title"                 varchar,
  "subtitle"              varchar,
  "description"           varchar,
  "background_image_id"   integer,
  "cta_label"             varchar,
  "updated_at"            timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"            timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "hero_content_background_image_idx" ON "hero_content" ("background_image_id");
ALTER TABLE "hero_content"
  ADD CONSTRAINT "hero_content_background_image_id_media_id_fk"
  FOREIGN KEY ("background_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- ABOUT_CONTENT (global: about-content)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "about_content" (
  "id"               serial PRIMARY KEY,
  "title"            varchar,
  "body"             varchar,
  "second_paragraph" varchar,
  "updated_at"       timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"       timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- about_content.images (array field)
CREATE TABLE IF NOT EXISTS "about_content_images" (
  "id"         varchar PRIMARY KEY,
  "_order"     integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "image_id"   integer NOT NULL
);
CREATE INDEX IF NOT EXISTS "about_content_images_order_idx"     ON "about_content_images" ("_order");
CREATE INDEX IF NOT EXISTS "about_content_images_parent_id_idx" ON "about_content_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "about_content_images_image_idx"     ON "about_content_images" ("image_id");
ALTER TABLE "about_content_images"
  ADD CONSTRAINT "about_content_images_image_id_media_id_fk"
  FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "about_content_images"
  ADD CONSTRAINT "about_content_images_parent_id_about_content_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "about_content"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- about_content.highlights (array field)
CREATE TABLE IF NOT EXISTS "about_content_highlights" (
  "id"         varchar PRIMARY KEY,
  "_order"     integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "text"       varchar
);
CREATE INDEX IF NOT EXISTS "about_content_highlights_order_idx"     ON "about_content_highlights" ("_order");
CREATE INDEX IF NOT EXISTS "about_content_highlights_parent_id_idx" ON "about_content_highlights" ("_parent_id");
ALTER TABLE "about_content_highlights"
  ADD CONSTRAINT "about_content_highlights_parent_id_about_content_id_fk"
  FOREIGN KEY ("_parent_id") REFERENCES "about_content"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- PAYLOAD SYSTEM TABLES
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "payload_migrations" (
  "id"         serial PRIMARY KEY,
  "name"       varchar,
  "batch"      numeric,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  "id"          serial PRIMARY KEY,
  "global_slug" varchar,
  "updated_at"  timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at"  timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  "id"             serial PRIMARY KEY,
  "order"          integer,
  "parent_id"      integer NOT NULL,
  "path"           varchar NOT NULL,
  "users_id"       integer,
  "media_id"       integer,
  "rooms_id"       integer,
  "breakfasts_id"  integer,
  "gallery_id"     integer,
  "experiences_id" integer,
  "reviews_id"     integer
);
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx"          ON "payload_locked_documents_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx"         ON "payload_locked_documents_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx"           ON "payload_locked_documents_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx"       ON "payload_locked_documents_rels" ("users_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx"       ON "payload_locked_documents_rels" ("media_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rooms_id_idx"       ON "payload_locked_documents_rels" ("rooms_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_breakfasts_id_idx"  ON "payload_locked_documents_rels" ("breakfasts_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_gallery_id_idx"     ON "payload_locked_documents_rels" ("gallery_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" ("experiences_id");
CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_reviews_id_idx"     ON "payload_locked_documents_rels" ("reviews_id");
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_parent_fk"
  FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_users_id_fk"
  FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_media_id_fk"
  FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_rooms_id_fk"
  FOREIGN KEY ("rooms_id") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_breakfasts_id_fk"
  FOREIGN KEY ("breakfasts_id") REFERENCES "breakfasts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_gallery_id_fk"
  FOREIGN KEY ("gallery_id") REFERENCES "gallery"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_experiences_id_fk"
  FOREIGN KEY ("experiences_id") REFERENCES "experiences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_locked_documents_rels"
  ADD CONSTRAINT "payload_locked_documents_rels_reviews_id_fk"
  FOREIGN KEY ("reviews_id") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE IF NOT EXISTS "payload_preferences" (
  "id"         serial PRIMARY KEY,
  "key"        varchar,
  "value"      jsonb,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx"        ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  "id"        serial PRIMARY KEY,
  "order"     integer,
  "parent_id" integer NOT NULL,
  "path"      varchar NOT NULL,
  "users_id"  integer
);
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx"    ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx"   ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx"     ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" ("users_id");
ALTER TABLE "payload_preferences_rels"
  ADD CONSTRAINT "payload_preferences_rels_parent_fk"
  FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payload_preferences_rels"
  ADD CONSTRAINT "payload_preferences_rels_users_id_fk"
  FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- ----------------------------------------------------------------
-- Mark schema as migrated (Payload dev-push marker)
-- ----------------------------------------------------------------
INSERT INTO "payload_migrations" ("name", "batch") VALUES ('dev', -1);
