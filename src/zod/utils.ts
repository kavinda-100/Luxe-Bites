import type { z } from "zod";

export function zodIssueToString(issue: z.ZodIssue[]): string {
  return issue.map((i) => i.message).join(", ");
}
