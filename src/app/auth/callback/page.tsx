"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      router.replace("/calendar");
      return;
    }

    const code = searchParams.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(() => {
        router.replace("/calendar");
      });
    } else {
      supabase.auth.getSession().then(() => {
        router.replace("/calendar");
      });
    }
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div
        className="h-8 w-8 rounded-full border-2 animate-spin"
        style={{ borderColor: "var(--text-secondary)", borderTopColor: "transparent" }}
      />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        Signing you in…
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading…</p>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
