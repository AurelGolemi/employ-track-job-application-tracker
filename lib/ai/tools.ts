import "server-only";

import { tool } from "ai";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/app/lib/db";
import { applications } from "@/app/lib/db/schema";

const searchApplicationsSchema = z.object({
  query: z.string().trim().max(120).optional(),
  limit: z.number().int().min(1).max(10).default(5),
});

export function buildTools(userId: string) {
  return {
    searchApplications: tool({
      description:
        "Search the signed-in user's job applications by company or role. Use this for questions about tracked applications. This tool is read-only.",
      inputSchema: searchApplicationsSchema,
      execute: async ({ query, limit }) => {
        const pattern = query?.trim()
          ? `%${query.trim().replace(/[\\%_]/g, "\\$&")}%`
          : undefined;
        const userFilter = eq(applications.userId, userId);
        const filter = pattern
          ? and(
              userFilter,
              or(
                ilike(applications.company, pattern),
                ilike(applications.role, pattern),
              ),
            )
          : userFilter;

        return db
          .select({
            id: applications.id,
            company: applications.company,
            role: applications.role,
            status: applications.status,
            appliedAt: applications.appliedAt,
          })
          .from(applications)
          .where(filter)
          .orderBy(desc(applications.appliedAt))
          .limit(limit);
      },
    }),
  };
}
