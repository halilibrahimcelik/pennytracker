CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" text DEFAULT '2025-10-05T22:31:10.835Z' NOT NULL,
	"updated_at" text DEFAULT '2025-10-05T22:31:10.836Z' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;