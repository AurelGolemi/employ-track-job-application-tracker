"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../auth/client";

export function useAccountActions() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.refresh();
    router.push("/login");
  }

  async function deleteAccount() {
    if (!window.confirm("Delete your account? This can't be undone.")) return;
    setIsPending(true);
    try {
      await authClient.deleteUser();
      router.push("/");
    } finally {
      setIsPending(false);
    }
  }

  return { signOut, deleteAccount, isPending };
}