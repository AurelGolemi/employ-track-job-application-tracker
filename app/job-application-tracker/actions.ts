"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { db } from "../../app/lib/db";
import { applications } from "../../app/lib/db/schema";
import { auth } from "@/app/lib/auth/server";

type State = { error?: string };

async function requireUserId() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error("Not authenticated");
  return session.user.id;
}

export async function addApplication(_prev: State, formData: FormData): Promise<State> {
  const company = String(formData.get("company") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const status = String(formData.get("status") ?? "applied");
  const appliedAt = String(formData.get("appliedAt") ?? "");

  if (!company || !role || !appliedAt) {
    return { error: "Company, role, and date are all required." };
  }

  const userId = await requireUserId();

  await db.insert(applications).values({
    userId,
    company,
    role,
    status: status as "applied" | "interviewing" | "offer" | "rejected",
    appliedAt,
  });

  revalidatePath("/job-application-tracker");
  return {};
}

export async function updateStatus(id: string, status: string) {
  const userId = await requireUserId();
  await db
    .update(applications)
    .set({ status: status as "applied" | "interviewing" | "offer" | "rejected" })
    .where(and(eq(applications.id, id), eq(applications.userId, userId)));

  revalidatePath("/job-application-tracker");
}

export async function deleteApplication(id: string) {
  const userId = await requireUserId();
  await db.delete(applications).where(and(eq(applications.id, id), eq(applications.userId, userId)));
  revalidatePath("/job-application-tracker");
}