ALTER TABLE "poems" drop column "image_ratio";--> statement-breakpoint
ALTER TABLE "poems" ADD COLUMN "image_ratio" numeric GENERATED ALWAYS AS (case 
        when "poems"."image_width" is not null and "poems"."image_height" is not null then
          ("poems"."image_width"::float / "poems"."image_height"::float)
        else null end
      ) STORED;