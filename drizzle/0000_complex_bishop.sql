CREATE TABLE "poems" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"poem" text NOT NULL,
	"mood" text NOT NULL,
	"image_path" text NOT NULL,
	"image_width" integer,
	"image_height" integer,
	"image_ratio" numeric GENERATED ALWAYS AS (nullif("poems"."image_width", 0) / nullif("poems"."image_height", 0)) STORED,
	"image_preview" text,
	"metadata" json DEFAULT '{}'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
