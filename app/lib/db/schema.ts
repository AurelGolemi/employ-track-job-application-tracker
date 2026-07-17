import { pgTable, uuid, text, timestamp, date } from "drizzle-orm/pg-core";

// MVP: bare-minimum fields only (company, role, status, date applied).
// userId ties each row to the signed-in user (from Neon Auth's session.user.id).
export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  status: text("status", { enum: ["applied", "interviewing", "offer", "rejected"] })
    .notNull()
    .default("applied"),
  appliedAt: date("applied_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;