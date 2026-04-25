"use client";

import { useEffect, useState } from "react";
import { PLANS } from "@/data";
import type { Plan } from "@/types/training";
import { getActivePlanId, getPlanStartDate, setActivePlanId, setPlanStartDate } from "@/lib/storage";

interface UseActivePlanReturn {
  plan: Plan;
  planStartDate: string;
  setActivePlan: (id: string) => void;
  updateStartDate: (isoDate: string) => void;
}

export function useActivePlan(): UseActivePlanReturn {
  const [planId, setPlanId] = useState<string>("10k-12w");
  const [startDate, setStartDate] = useState<string>("");

  useEffect(() => {
    setPlanId(getActivePlanId());
    setStartDate(getPlanStartDate());
  }, []);

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];

  function setActivePlan(id: string) {
    setActivePlanId(id);
    setPlanId(id);
  }

  function updateStartDate(isoDate: string) {
    setPlanStartDate(isoDate);
    setStartDate(isoDate);
  }

  return { plan, planStartDate: startDate, setActivePlan, updateStartDate };
}
