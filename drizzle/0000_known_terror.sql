CREATE TABLE `poems` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`poem` text NOT NULL,
	`mood` text NOT NULL,
	`image_path` text NOT NULL,
	`image_width` integer,
	`image_height` integer,
	`image_ratio` numeric GENERATED ALWAYS AS (case 
        when "image_width" is not null and "image_height" is not null then
          ("image_width" * 1.0) / ("image_height" * 1.0)
        else null end
      ) VIRTUAL,
	`image_preview` text,
	`metadata` text DEFAULT '{}',
	`created_at` integer,
	`updated_at` integer
);
