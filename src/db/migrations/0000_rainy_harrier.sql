CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" text DEFAULT '2025-10-05T08:24:32.822Z' NOT NULL,
	"updated_at" text DEFAULT '2025-10-05T08:24:32.822Z' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
