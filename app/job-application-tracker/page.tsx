import { eq, desc } from "drizzle-orm";
import { db } from "../../app/lib/db";
import { applications } from "../../app/lib/db/schema";
import { auth } from "@/app/lib/auth/server";
import Header from "@/app/Components/shared/Header";
import Footer from "@/app/Components/shared/Footer";
import AddApplicationForm from "./AddApplicationForm";
import ApplicationRow from "./ApplicationRow";

export const dynamic = "force-dynamic";

export default async function JobApplicationTrackerPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            Not authenticated.{" "}
            <a href="/login" className="cursor-pointer text-neutral-900 dark:text-white underline underline-offset-4">
              Log in
            </a>
          </p>
        </div>
        <Footer />
      </>
    );
  }

  const rows = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, session.user.id))
    .orderBy(desc(applications.appliedAt));

  return (
    <>
      <Header />
      <main className="bg-white dark:bg-black min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">
            Job Application Tracker
          </h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            {rows.length === 0
              ? "No applications yet — add your first one below."
              : `${rows.length} application${rows.length === 1 ? "" : "s"} tracked.`}
          </p>

          <div className="mt-6">
            <AddApplicationForm />
          </div>

          {rows.length > 0 && (
            <div className="mt-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-x-auto">
              <table className="w-full min-w-160">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-left">
                    {["Company", "Role", "Status", "Applied", ""].map((h) => (
                      <th
                        key={h}
                        className="py-3 pr-4 first:pl-6 text-xs font-mono uppercase tracking-wide text-neutral-400 dark:text-neutral-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((app) => (
                    <ApplicationRow key={app.id} app={app} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}