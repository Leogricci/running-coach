import type { Plan } from "@/types/training";
import { plan10k } from "./plans/plan-10k";
import { planHalf } from "./plans/plan-half";
import { planMarathon } from "./plans/plan-marathon";

export const PLANS: Plan[] = [plan10k, planHalf, planMarathon];

export { plan10k, planHalf, planMarathon };
