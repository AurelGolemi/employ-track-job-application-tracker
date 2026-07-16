import { auth } from "../lib/auth/server";
import ProfileForm from "./ProfileForm";
import DangerZone from "./DangerZone";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">
          Not authenticated. {" "}
          <a href="/login" className="cursor-pointer text-neutral-900 underline underline-offset-4 dark:text-white">
            Log in
          </a>
        </p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-xl font-semibold text-white dark:bg-white dark:text-black">
            {(user.name?.[0] ?? user.email[0]).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white">Settings</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Manage your profile preferences from one place.
                </p>
              </div>
              <a
                href="/profile/settings"
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-center font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800"
              >
                Open settings
              </a>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Account</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Update your name and contact details.</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Security</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Review your account security and support options.</p>
              </div>
            </div>
          </div>

          <ProfileForm initialName={user.name ?? ""} />
        </div>
      </div>

      <div className="mt-6">
        <DangerZone />
      </div>
    </div>
  );
}