CREATE TABLE "comments_1" (
	"id" text PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"user_avatar" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "upvotes_1" (
	"id" text PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
