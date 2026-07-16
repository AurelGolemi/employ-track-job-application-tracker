import { auth } from "../../lib/auth/server";
import ProfileForm from "../../profile/ProfileForm";
import DangerZone from "../../profile/DangerZone";

export const dynamic = "force-dynamic";

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-8 py-8 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      <div className="sm:col-span-4">
        <h2 className="text-sm font-medium text-neutral-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>
      <div className="sm:col-span-8">{children}</div>
    </div>
  );
}

export default async function SettingsPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">
          Not authenticated.{" "}
          <a href="/login" className="cursor-pointer text-neutral-900 dark:text-white underline underline-offset-4">
            Log in
          </a>
        </p>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-xl font-semibold text-white dark:text-black">
          {(user.name?.[0] ?? user.email[0]).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-neutral-900 dark:text-white">Settings</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Manage your account and profile.</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6">
        <Row title="Profile" description="Your display name, shown across EmployTrack.">
          <ProfileForm initialName={user.name ?? ""} />
        </Row>

        <Row title="Email" description="The email tied to your account.">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">{user.email}</p>
        </Row>
      </div>

      <div className="mt-6">
        <DangerZone />
      </div>
    </div>
  );
}