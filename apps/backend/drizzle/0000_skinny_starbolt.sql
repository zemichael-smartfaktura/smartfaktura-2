CREATE TYPE "public"."invoice_activity_action" AS ENUM('created', 'pdf_generated', 'sent', 'status_changed');--> statement-breakpoint
CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'sent', 'paid', 'cancelled');--> statement-breakpoint
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
ALTER TABLE "customers" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "invoice_activity_log" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"action" "invoice_activity_action" NOT NULL,
	"payload" jsonb,
	"performed_by" text,
	"performed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoice_activity_log" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
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
ALTER TABLE "invoice_line_items" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"customer_id" text,
	"number" text NOT NULL,
	"status" "invoice_status" NOT NULL,
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
ALTER TABLE "invoices" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
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
ALTER TABLE "products" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE UNIQUE INDEX "customers_organization_id_email_idx" ON "customers" USING btree ("organization_id","email");--> statement-breakpoint
CREATE INDEX "customers_organization_id_idx" ON "customers" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "customers_deleted_at_idx" ON "customers" USING btree ("deleted_at");--> statement-breakpoint
CREATE INDEX "invoice_activity_log_invoice_id_idx" ON "invoice_activity_log" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "invoice_activity_log_organization_id_idx" ON "invoice_activity_log" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invoice_activity_log_performed_at_idx" ON "invoice_activity_log" USING btree ("performed_at");--> statement-breakpoint
CREATE INDEX "invoice_line_items_invoice_id_idx" ON "invoice_line_items" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "invoice_line_items_product_id_idx" ON "invoice_line_items" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "invoices_organization_id_number_idx" ON "invoices" USING btree ("organization_id","number");--> statement-breakpoint
CREATE INDEX "invoices_organization_id_idx" ON "invoices" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invoices_organization_id_status_idx" ON "invoices" USING btree ("organization_id","status");--> statement-breakpoint
CREATE INDEX "invoices_customer_id_idx" ON "invoices" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "invoices_organization_id_invoice_date_idx" ON "invoices" USING btree ("organization_id","invoice_date");--> statement-breakpoint
CREATE INDEX "products_organization_id_idx" ON "products" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "products_deleted_at_idx" ON "products" USING btree ("deleted_at");--> statement-breakpoint
CREATE POLICY "customers_org_isolation" ON "customers" AS PERMISSIVE FOR ALL TO current_user USING (organization_id = current_setting('app.current_organization_id', true)) WITH CHECK (organization_id = current_setting('app.current_organization_id', true));--> statement-breakpoint
CREATE POLICY "invoice_activity_log_org_isolation" ON "invoice_activity_log" AS PERMISSIVE FOR ALL TO current_user USING (organization_id = current_setting('app.current_organization_id', true)) WITH CHECK (organization_id = current_setting('app.current_organization_id', true));--> statement-breakpoint
CREATE POLICY "invoice_line_items_org_via_invoice" ON "invoice_line_items" AS PERMISSIVE FOR ALL TO current_user USING (invoice_id IN (SELECT id FROM invoices WHERE organization_id = current_setting('app.current_organization_id', true))) WITH CHECK (invoice_id IN (SELECT id FROM invoices WHERE organization_id = current_setting('app.current_organization_id', true)));--> statement-breakpoint
CREATE POLICY "invoices_org_isolation" ON "invoices" AS PERMISSIVE FOR ALL TO current_user USING (organization_id = current_setting('app.current_organization_id', true)) WITH CHECK (organization_id = current_setting('app.current_organization_id', true));--> statement-breakpoint
CREATE POLICY "products_org_isolation" ON "products" AS PERMISSIVE FOR ALL TO current_user USING (organization_id = current_setting('app.current_organization_id', true)) WITH CHECK (organization_id = current_setting('app.current_organization_id', true));