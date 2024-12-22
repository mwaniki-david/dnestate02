CREATE TABLE IF NOT EXISTS "invoice" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"amount" numeric NOT NULL,
	"due_date" timestamp NOT NULL,
	"status" varchar(50) DEFAULT 'pending'
);
