"use server";

import { auth } from "../lib/auth/server";

type State = { error?: string; success?: boolean };

// NOTE: auth.api.updateUser is the Better Auth server call for updating the
// current session's user. Adjust the method name if your Neon Auth server
// export uses a different shape.
export async function updateProfile(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Name can't be empty." };

  try {
    await auth.updateUser({ name });
    return { success: true };
  } catch {
    return { error: "Couldn't update profile. Try again." };
  }
}
