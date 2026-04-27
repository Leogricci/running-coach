"use client";

import { useEffect, useState } from "react";
import type { SessionLog } from "@/types/training";
import { addSessionLog, deleteSessionLog, getSessionLogs } from "@/lib/storage";
import { getSupabaseClient } from "@/lib/supabase";
import { pushSessionLog, deleteRemoteLog } from "@/lib/sync";

export function useSessionLog() {
  const [logs, setLogs] = useState<SessionLog[]>([]);

  useEffect(() => {
    setLogs(getSessionLogs());
  }, []);

  function logSession(log: SessionLog) {
    addSessionLog(log);
    setLogs(getSessionLogs());

    // Push to Supabase in the background if signed in — fire and forget
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) pushSessionLog(log, data.user.id);
      });
    }
  }

  function removeLog(id: string) {
    deleteSessionLog(id);
    setLogs(getSessionLogs());

    // Delete from Supabase in the background
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) deleteRemoteLog(id);
      });
    }
  }

  function isCompleted(planId: string, sessionId: string): boolean {
    return logs.some((l) => l.planId === planId && l.sessionId === sessionId);
  }

  return { logs, logSession, removeLog, isCompleted };
}
