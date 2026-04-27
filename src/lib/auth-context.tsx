"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabase";
import { pullAndMergeSessionLogs, pushAllLocalLogs } from "./sync";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  syncNow: () => Promise<void>;
  syncing: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signInWithEmail: async () => ({ error: null }),
  signOut: async () => {},
  syncNow: async () => {},
  syncing: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const runSync = useCallback(async (userId: string) => {
    setSyncing(true);
    try {
      await pullAndMergeSessionLogs();
      await pushAllLocalLogs(userId);
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) runSync(u.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (event === "SIGNED_IN" && u) runSync(u.id);
    });

    return () => subscription.unsubscribe();
  }, [runSync]);

  async function signInWithEmail(email: string): Promise<{ error: string | null }> {
    const supabase = getSupabaseClient();
    if (!supabase) return { error: "Supabase not configured" };
    const redirectTo = typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function syncNow() {
    if (!user) return;
    await runSync(user.id);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithEmail, signOut, syncNow, syncing }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
