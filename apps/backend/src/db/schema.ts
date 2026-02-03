import {
  date,
  index,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const customers = pgTable(
  "customers",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    address: text("address").notNull(),
    country: text("country").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("customers_organization_id_email_idx").on(table.organizationId, table.email),
    index("customers_organization_id_idx").on(table.organizationId),
    index("customers_deleted_at_idx").on(table.deletedAt),
  ],
);

export const invoices = pgTable(
  "invoices",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull(),
    customerId: text("customer_id"),
    number: text("number").notNull(),
    status: text("status").notNull(), // 'draft' | 'sent' | 'paid'
    currencyCode: text("currency_code").notNull().default("NOK"),
    invoiceDate: date("invoice_date").notNull(),
    dueDate: date("due_date"),
    subtotal: numeric("subtotal", { precision: 14, scale: 2 }).notNull(),
    total: numeric("total", { precision: 14, scale: 2 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdBy: text("created_by"),
    updatedBy: text("updated_by"),
  },
  (table) => [
    uniqueIndex("invoices_organization_id_number_idx").on(table.organizationId, table.number),
    index("invoices_organization_id_idx").on(table.organizationId),
    index("invoices_organization_id_status_idx").on(table.organizationId, table.status),
    index("invoices_customer_id_idx").on(table.customerId),
    index("invoices_organization_id_invoice_date_idx").on(table.organizationId, table.invoiceDate),
  ],
);

export const invoiceLineItems = pgTable(
  "invoice_line_items",
  {
    id: text("id").primaryKey(),
    invoiceId: text("invoice_id").notNull(),
    description: text("description").notNull(),
    quantity: numeric("quantity", { precision: 14, scale: 4 }).notNull(),
    unitPrice: numeric("unit_price", { precision: 14, scale: 2 }).notNull(),
    vatRate: numeric("vat_rate", { precision: 5, scale: 2 }),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull(),
    sortOrder: integer("sort_order"),
  },
  (table) => [index("invoice_line_items_invoice_id_idx").on(table.invoiceId)],
);
