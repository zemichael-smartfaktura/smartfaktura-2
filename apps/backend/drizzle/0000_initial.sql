CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"country" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"customer_id" text,
	"number" text NOT NULL,
	"status" text NOT NULL,
	"currency_code" text DEFAULT 'NOK' NOT NULL,
	"invoice_date" date NOT NULL,
	"due_date" date,
	"subtotal" numeric(14, 2) NOT NULL,
	"total" numeric(14, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" text,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "invoice_line_items" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"product_id" text,
	"description" text NOT NULL,
	"quantity" numeric(14, 4) NOT NULL,
	"unit_price" numeric(14, 2) NOT NULL,
	"vat_rate" numeric(5, 2),
	"amount" numeric(14, 2) NOT NULL,
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"unit_price" numeric(14, 2) NOT NULL,
	"vat_rate" numeric(5, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "invoice_activity_log" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"action" text NOT NULL,
	"payload" text,
	"performed_by" text,
	"performed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "customers_organization_id_email_idx" ON "customers" USING btree ("organization_id","email");
--> statement-breakpoint
CREATE INDEX "customers_organization_id_idx" ON "customers" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX "customers_deleted_at_idx" ON "customers" USING btree ("deleted_at");
--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_organization_id_number_idx" ON "invoices" USING btree ("organization_id","number");
--> statement-breakpoint
CREATE INDEX "invoices_organization_id_idx" ON "invoices" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX "invoices_organization_id_status_idx" ON "invoices" USING btree ("organization_id","status");
--> statement-breakpoint
CREATE INDEX "invoices_customer_id_idx" ON "invoices" USING btree ("customer_id");
--> statement-breakpoint
CREATE INDEX "invoices_organization_id_invoice_date_idx" ON "invoices" USING btree ("organization_id","invoice_date");
--> statement-breakpoint
CREATE INDEX "invoice_line_items_invoice_id_idx" ON "invoice_line_items" USING btree ("invoice_id");
--> statement-breakpoint
CREATE INDEX "invoice_line_items_product_id_idx" ON "invoice_line_items" USING btree ("product_id");
--> statement-breakpoint
CREATE INDEX "products_organization_id_idx" ON "products" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX "products_deleted_at_idx" ON "products" USING btree ("deleted_at");
--> statement-breakpoint
CREATE INDEX "invoice_activity_log_invoice_id_idx" ON "invoice_activity_log" USING btree ("invoice_id");
--> statement-breakpoint
CREATE INDEX "invoice_activity_log_organization_id_idx" ON "invoice_activity_log" USING btree ("organization_id");
--> statement-breakpoint
CREATE INDEX "invoice_activity_log_performed_at_idx" ON "invoice_activity_log" USING btree ("performed_at");
