CREATE TABLE `bucket_items` (
	`uuid` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` integer NOT NULL,
	`deadline` integer NOT NULL,
	`achieved_at` integer,
	`status` text NOT NULL,
	`category_id` text
);
--> statement-breakpoint
CREATE TABLE `category` (
	`uuid` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL
);
