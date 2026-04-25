"use client";

import { useEffect, useState } from "react";
import type { SessionLog } from "@/types/training";
import { addSessionLog, deleteSessionLog, getSessionLogs } from "@/lib/storage";

export function useSessionLog() {
  const [logs, setLogs] = useState<SessionLog[]>([]);

  useEffect(() => {
    setLogs(getSessionLogs());
  }, []);

  function logSession(log: SessionLog) {
    addSessionLog(log);
    setLogs(getSessionLogs());
  }

  function removeLog(id: string) {
    deleteSessionLog(id);
    setLogs(getSessionLogs());
  }

  function isCompleted(planId: string, sessionId: string): boolean {
    return logs.some((l) => l.planId === planId && l.sessionId === sessionId);
  }

  return { logs, logSession, removeLog, isCompleted };
}
